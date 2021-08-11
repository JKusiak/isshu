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


boardSchema.post('findOneAndDelete', async function(res) {
      const boardId = res._id;
      
      const childColumns = await Column.find({boardId: boardId});

      // array of promises is passed to Promise.all to resolve concurrently
      Promise.all(
            childColumns.map(async column => {
                  await Column.findByIdAndDelete(column._id)
            })
      );
});


const Board = mongoose.model('Board', boardSchema);

export default Board;