import mongoose from 'mongoose';
import Column from './columnModel.js';


const boardSchema = mongoose.Schema({
      name: {
            type: String,
            required: true,
      },
      projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true,
      },
});


// middleware for deleting in a cascade all children upon
// removing parent board document using findOneAndDelete
// boardSchema.post('findOneAndDelete', async function(res) {
//       const boardId = res._id;
      
//       const childColumns = await Column.find({boardId: boardId});

//       // array of promises is passed to Promise.all to resolve concurrently
//       Promise.all(
//             childColumns.map(async column => {
//                   await Column.findByIdAndDelete(column._id)
//             })
//       );
// });


/**
 * Virtual property based on id reference stored in column
 *
 * @key ref           Model refered in the property.
 * @key localField    Field from local model.
 * @key foreignField  Field from referenced model.
 */
boardSchema.virtual('columns', {
      ref: 'Column',
      localField: '_id',
      foreignField: 'boardId',
});


// necessary for getting the result on populate query,
// both default to false
boardSchema.set('toObject', { virtuals: true });
boardSchema.set('toJSON', { virtuals: true });


const Board = mongoose.model('Board', boardSchema);

export default Board;