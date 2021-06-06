import mongoose from 'mongoose';

const columnSchema = mongoose.Schema({

      name: {
            type: String,
            required: true,
      },

      // ISSUES
});

const Column = mongoose.model('Column', columnSchema);

export default Column;