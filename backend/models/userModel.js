import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

function setPassword(value) {
      return bcrypt.hashSync(value, 10);
}

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
            set: setPassword
      },
      isAdmin: {
            type: Boolean,
            required: true,
            default: false,
      },
      organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
            required: false,
            default: null,
      },
      projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: false,
            default: null,
      }],
      invitations: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
            required: false,
            default: [],
      }]
});


const User = mongoose.model('User', userSchema);

export default User;