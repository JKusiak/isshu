import express from 'express';
import { authenticateJWT, loginUser, newOrganizationToken } from '../controllers/authenticationController.js';

export const authRouter = express.Router();
export const protectedAuthRouter = express.Router();

protectedAuthRouter.use(authenticateJWT);

authRouter.route('/').post(loginUser);

protectedAuthRouter.route('/newOrganization/').post(newOrganizationToken);
