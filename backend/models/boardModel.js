import mongoose from 'mongoose';
import Column from './columnModel.js';
import Project from './projectModel.js';


const boardSchema = mongoose.Schema({
      name: {
            type: String,
            required: true,
      },
      columns: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Column',
            required: false,
            default: null,
      }],
});


// middleware for deleting all Columns stored in Board and Board id
// reference stored in Project upon Board removal
boardSchema.post('findOneAndDelete', async function(res) {
      const projectId = await Project.findOne({ boards: res._id }).select('_id');
      const boardId = res._id;
      const columnIdArr = res.columns;

      const update = { 
            $pullAll: {
                boards: [boardId],
            } 
      };

      const options =  {
            safe: true, 
            upsert: true
      };

      // map function returns an array of promises stored in removedColumns
      const removedColumns = columnIdArr.map(async columnId => {
            return await Column.findByIdAndDelete(columnId);
      });

      // array of promises is passed to Promise.all to resolve concurrently
      Promise.all(removedColumns);
      
      if(projectId) {
            await Project.findByIdAndUpdate(projectId, update, options);
      }
      
});


const Board = mongoose.model('Board', boardSchema);

export default Board;