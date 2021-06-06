import mongoose, { mongo } from 'mongoose';

const issueSchema = mongoose.Schema({

      description: {
            type: String,
            required: true,
      },

      //CREATOR SOLVER TAGS
});

const Issue = mongoose.model('Issue', issueSchema);

export default Issue;