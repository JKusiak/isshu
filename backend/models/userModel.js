import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
      name: {
            type: String,
            required: true,
            trim: true,
      },
      surname: {
            type: String,
            required: true,
            trim: true,
      },
      email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
      },
      password: {
            type: String,
            required: true,
      },
      isAdmin: {
            type: Boolean,
            required: true,
            default: false,
      },

      // PROJECTS ISSUES BOARDS
});

const User = mongoose.model('User', userSchema);

export default User;