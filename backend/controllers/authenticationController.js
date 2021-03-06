import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


export const loginUser = asyncHandler(async(req, res) => {
      const userData = await User.findOne({email: req.body.email});
 
      const user = {
            _id: userData._id,
            email: userData.email,
            name: userData.name,
            surname: userData.surname,
            organizationId: userData.organizationId,
      }

      if (bcrypt.compareSync(req.body.password, userData.password)) {
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            // res.cookie('token', accessToken, {httpOnly: true});
            res.json({ token: accessToken});
      } else {
            res.status(401).json({message: 'Authentication failed. Invalid user or password.'});
      }
})


export const newOrganizationToken = asyncHandler(async(req, res) => {
      const user = req.body;

      try {
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            res.json({ token: accessToken});
      } catch(err) {
            res.status(401).json({message: 'Authentication failed. Invalid user or password.'});
      }

})


export const authenticateJWT = (req, res, next) => {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      
      if(token == null) {
            return res.sendStatus(401);
      } 
      
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) {
                  res.send(403);
            }
            req.user = user;
            next();
      })
};