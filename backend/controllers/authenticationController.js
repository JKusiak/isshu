import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const loginUser = asyncHandler(async(req, res) => {
      const userData = await User.findOne({email: req.body.email});
 
      const user = {
            _id: userData._id,
            email: userData.email,
      }

      if (bcrypt.compareSync(req.body.password, userData.password)) {
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            return res.json({ token: accessToken});
      } else {
            return res.status(401).json({message: 'Authentication failed. Invalid user or password.'});
      }
})


export const getUserByToken = asyncHandler(async(req, res) => {
      if(req.user) {
            res.send(req.user);
      } else {
            res.status(401).json({ message: 'Invalid token' });
      }
});
      