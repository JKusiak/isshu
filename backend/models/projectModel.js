import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({

      name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
      },
      description: {
            type: String,
            required: false,
            default: null,
      },
      dateStart: {
            type: Date,
            required: true,
      },
      dateEnd: {
            type: Date,
            required: false,
            default: null,
      },
      creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',           
            required: true,
      },
      contributors: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
            default: null,
      }],
      boards: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board',
            required: false,
            default: null,
      }],
});

const Project = mongoose.model('Project', projectSchema);

export default Project;