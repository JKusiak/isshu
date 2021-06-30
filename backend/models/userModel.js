import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
      hash_password: {
            type: String,
      },
      isAdmin: {
            type: Boolean,
            required: true,
            default: false,
      },
      projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: false,
            default: null,
      }]
});

userSchema.methods.comparePassword = function(password) {
      return bcrypt.compare(password, this.hash_password, function(err, result){
            console.log(result);
      });
};

const User = mongoose.model('User', userSchema);

export default User;