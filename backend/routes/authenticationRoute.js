import express from 'express';
import { loginUser, getUserByToken } from '../controllers/authenticationController.js';

const router = express.Router();

router.route('/').post(loginUser);

router.route('/getUserByToken').get(getUserByToken);

export default router;