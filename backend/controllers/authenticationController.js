import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';


export const loginUser = asyncHandler(async(req, res) => {

      const ussr = await User.findOne({ email: req.body.email });

      const user = {
            _id: ussr._id,
            email: ussr.email,
      }

      // if (!user || (!user.comparePassword(req.body.password))) {
      //       return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
      // }

      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

      return res.json({ token: accessToken});
})

export const getUserByToken = asyncHandler(async(req, res) => {
      if(req.user) {
            res.send(req.user);
      } else {
            res.status(401).json({ message: 'Invalid token' });
      }
});
      