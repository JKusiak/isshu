import mongoose from 'mongoose';


const tagSchema = mongoose.Schema({
      name: {
            type: String,
            required: true,
      },
      organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
            required: false,
            default: null,
      }
});

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;