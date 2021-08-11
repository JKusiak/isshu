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
});


// middleware for deleting all Boards stored in Project and Project id
// reference stored in User upon Project removal
projectSchema.post('findOneAndDelete', async function(res) {
      const projectId = res._id;

      const userId = await User.findOne({ projects: res._id }).select('_id');
      const update = { 
            $pullAll: {
                  projects: [projectId],
            } 
      };

      const options =  {
            safe: true, 
            upsert: true
      };

      await User.findByIdAndUpdate(userId, update, options);

      
      const childBoards = await Board.find({projectId: projectId});

      // array of promises is passed to Promise.all to resolve concurrently
      Promise.all(
            childBoards.map(async board => {
                  await Board.findByIdAndDelete(board._id)
            })
      );
});


const Project = mongoose.model('Project', projectSchema);

export default Project;