import express from 'express';
import { loginUser, getUserByToken } from '../controllers/authenticationController.js';
import jwt from 'jsonwebtoken';
import { authenticateJWT } from '../controllers/authenticationController.js';

export const router = express.Router();
export const protectedRouter = express.Router();

protectedRouter.use(authenticateJWT);

router.route('/').post(loginUser);

protectedRouter.route('/getUserByToken').get(getUserByToken);
