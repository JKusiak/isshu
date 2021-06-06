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
      },
      dateStart: {
            type: Date,
            required: true,
      },
      dateEnd: {
            type: Date,
            required: false,
      },

      // CONTRIBUTORS BOARDS
});

const Project = mongoose.model('Project', projectSchema);

export default Project;