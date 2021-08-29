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
      organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
            required: false,
            default: null,
      },
});


// middleware for deleting all Boards stored in Project and Project id
// reference stored in User upon Project removal
projectSchema.post('findOneAndDelete', async function(res) {
      const projectId = res._id;
      const user = await User.findOne({ projects: projectId});
      const update = { 
            $pullAll: {
                  projects: [projectId],
            } 
      };

      const options =  {
            new: true, 
            useFindAndModify: false,
      };

      await User.findByIdAndUpdate(user._id, update, options);

      
      const childBoards = await Board.find({projectId: projectId});

      // array of promises is passed to Promise.all to resolve concurrently
      Promise.all(
            childBoards.map(async board => {
                  await Board.findByIdAndDelete(board._id);
            })
      );
});


/**
 * Virtual property based on id reference stored in column
 *
 * @key ref           Model refered in the property.
 * @key localField    Field from local model.
 * @key foreignField  Field from referenced model.
 */
 projectSchema.virtual('boards', {
      ref: 'Board',
      localField: '_id',
      foreignField: 'projectId',
});


// necessary for getting the result on populate query,
// both default to false
projectSchema.set('toObject', { virtuals: true });
projectSchema.set('toJSON', { virtuals: true });


const Project = mongoose.model('Project', projectSchema);

export default Project;