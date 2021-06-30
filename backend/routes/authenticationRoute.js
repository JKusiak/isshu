import express from 'express';
import { loginUser, getUserByToken } from '../controllers/authenticationController.js';
import jwt from 'jsonwebtoken';


export const router = express.Router();
export const protectedRouter = express.Router();


// middleware for JWT token authentication
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


protectedRouter.use(authenticateJWT);


router.route('/').post(loginUser);

protectedRouter.route('/getUserByToken').get(getUserByToken);
