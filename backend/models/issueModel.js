import mongoose from 'mongoose';

const issueSchema = mongoose.Schema({
      description: {
            type: String,
            required: true,
      },
      creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
      },
      contributor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
            default: null,
      },
      tags: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag',
            required: false,
            default: null,
      }],
});

const Issue = mongoose.model('Issue', issueSchema);

export default Issue;