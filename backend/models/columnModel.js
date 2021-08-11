import mongoose from 'mongoose';


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


columnSchema.post('findOneAndDelete', async function(res) {
      const columnId = res._id;
      
      const childIssues = await Issue.find({columnId: columnId});

      // array of promises is passed to Promise.all to resolve concurrently
      Promise.all(
            childIssues.map(async column => {
                  await Issue.findByIdAndDelete(column._id)
            })
      );
});


const Column = mongoose.model('Column', columnSchema);

export default Column;