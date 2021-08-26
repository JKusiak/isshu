import express from 'express';
import { authenticateJWT, loginUser, newOrganizationToken } from '../controllers/authenticationController.js';

export const router = express.Router();
export const protectedRouter = express.Router();

protectedRouter.use(authenticateJWT);

router.route('/').post(loginUser);

protectedRouter.route('/newOrganization/').post(newOrganizationToken);
