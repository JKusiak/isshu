import mongoose from 'mongoose';
import Board from './boardModel.js';
import User from './userModel.js';


const projectSchema = mongoose.Schema({
      name: {
            type: String,
            unique: true,
            required: true,
            trim: true,
      },
      description: {
            type: String,
            required: true,
      },
      dateStart: {
            type: Date,
            required: true,
      },
      dateEnd: {
            type: Date,
            required: false,
      },
      creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',           
            required: true,
      },
      boards: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board',
            required: false,
            default: null,
      }],
});


// middleware for deleting all Boards stored in Project and Project id
// reference stored in User upon Project removal
projectSchema.post('findOneAndDelete', async function(res) {
      const userId = await User.findOne({ projects: res._id }).select('_id');
      const projectId = res._id;
      const boardIdArr = res.boards;

      const update = { 
            $pullAll: {
                projects: [projectId],
            } 
      };

      const options =  {
            safe: true, 
            upsert: true
      };

      // map function returns an array of promises stored in removedIssues
      const removedBoards = boardIdArr.map(async boardId => {
            return await Board.findByIdAndDelete(boardId);
      });

      // array of promises is passed to Promise.all to resolve concurrently
      Promise.all(removedBoards);

      if(userId) {
            await User.findByIdAndUpdate(userId, update, options);
      }
});


const Project = mongoose.model('Project', projectSchema);

export default Project;