import mongoose from 'mongoose';

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
      users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
            default: null,
      }]
      
});

const Board = mongoose.model('Board', boardSchema);

export default Board;