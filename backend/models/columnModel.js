import mongoose from 'mongoose';
import Issue from '../models/issueModel.js';


const columnSchema = mongoose.Schema({
      name: {
            type: String,
            required: true,
      },
      boardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board',
            required: true,
      }
});


// middleware for deleting in a cascade all children upon
// removing parent column document using findOneAndDelete
columnSchema.post('findOneAndDelete', async function(res) {
      const columnId = res._id;
      const childIssues = await Issue.find({columnId: columnId});
      
      // array of promises is passed to Promise.all to resolve concurrently
      Promise.all(
            childIssues.map(async issue => {
                  await Issue.findByIdAndDelete(issue._id);
            })
      );
});


/**
 * Virtual property based on id reference stored in issue
 *
 * @key ref           Model refered in the property.
 * @key localField    Field from local model.
 * @key foreignField  Field from referenced model.
 */
 columnSchema.virtual('issues', {
      ref: 'Issue',
      localField: '_id',
      foreignField: 'columnId',
});


// necessary for getting the result on populate query,
// both default to false
columnSchema.set('toObject', { virtuals: true });
columnSchema.set('toJSON', { virtuals: true });


const Column = mongoose.model('Column', columnSchema);

export default Column;