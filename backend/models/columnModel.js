import mongoose from 'mongoose';
import Issue from './issueModel.js';
import Board from './boardModel.js';


const columnSchema = mongoose.Schema({
      name: {
            type: String,
            required: true,
      },
      issues: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Issue',
            required: false,
            default: null,
      }],
});


// middleware to delete all Issues stored in Column and Column id
// reference stored in Board upon Column removal
columnSchema.post('findOneAndDelete', async function(res) {
      const boardId = await Board.findOne({ columns: res._id }).select('_id');
      const columnId = res._id;
      const issueIdArr = res.issues;

      const update = { 
            $pullAll: {
                columns: [columnId],
            } 
      };

      const options =  {
            safe: true, 
            upsert: true
      };

      // map function returns an array of promises stored in removedIssues
      const removedIssues = issueIdArr.map(async issueId => {
            return await Issue.findByIdAndDelete(issueId);
      });

      // array of promises is passed to Promise.all to resolve concurrently
      Promise.all(removedIssues);

      if(boardId) {
            await Board.findByIdAndUpdate(boardId, update, options);
      }
});


const Column = mongoose.model('Column', columnSchema);

export default Column;