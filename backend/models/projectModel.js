import mongoose from 'mongoose';


const projectSchema = mongoose.Schema({
      name: {
            type: String,
            unique: true,
            required: true,
            trim: true,
      },
      description: {
            type: String,
            required: true,
      },
      dateStart: {
            type: Date,
            required: true,
      },
      dateEnd: {
            type: Date,
            required: false,
      },
      creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',           
            required: true,
      },
      boards: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board',
            required: false,
            default: null,
      }],
});

const Project = mongoose.model('Project', projectSchema);

export default Project;