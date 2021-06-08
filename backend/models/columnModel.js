import mongoose from 'mongoose';

const columnSchema = mongoose.Schema({
      name: {
            type: String,
            required: true,
      },
      issues: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Issue',
            required: false,
            default: null,
      }],
});

const Column = mongoose.model('Column', columnSchema);

export default Column;