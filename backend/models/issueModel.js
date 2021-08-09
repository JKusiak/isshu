import mongoose from 'mongoose';
import Column from './columnModel.js';


const issueSchema = mongoose.Schema({
      name: {
            type: String,
            required: true,
      },
      creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
      },
      contributor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
            default: null,
      },
      tags: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag',
            required: false,
            default: null,
      }],
});


// middleware to delete  Issue id reference stored in Column upon Issue removal
issueSchema.post('findOneAndDelete', async function(res) {
      const columnId = await Column.findOne({ issues: res._id }).select('_id');
      const issueId = res._id;

      const update = { 
            $pullAll: {
                issues: [issueId],
            } 
      };

      const options =  {
            safe: true, 
            upsert: true
      };

      if(columnId) {
            await Column.findByIdAndUpdate(columnId, update, options);
      }
});


const Issue = mongoose.model('Issue', issueSchema);

export default Issue;