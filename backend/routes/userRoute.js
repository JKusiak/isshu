import express from 'express';
import { authenticateJWT } from '../controllers/authenticationController.js';
import {
      addProjectToUser, addUser, deleteProjectFromUser, deleteUser, getAllUsers, getLoggedUser, getProjectsOfUser, getUserById, getUsersByProject,
      getUsersWithoutProject, updateUser
} from "../controllers/userController.js";


export const protectedUserRouter = express.Router();

export const userRouter = express.Router();

protectedUserRouter.use(authenticateJWT);

protectedUserRouter.route('/').get(getAllUsers);

protectedUserRouter.route('/:userId').get(getUserById);

protectedUserRouter.route('/profile/token').get(getLoggedUser);

userRouter.route('/add').post(addUser);

protectedUserRouter.route('/update/:userId').post(updateUser);

protectedUserRouter.route('/delete/:userId').delete(deleteUser);

protectedUserRouter.route('/getProjects/:userId').get(getProjectsOfUser);

protectedUserRouter.route('/addProject/:userId').post(addProjectToUser);

protectedUserRouter.route('/deleteProject/:userId').delete(deleteProjectFromUser);

protectedUserRouter.route('/getUsersByProject/:userId').get(getUsersByProject);

protectedUserRouter.route('/getUsersWithoutProject/:userId').get(getUsersWithoutProject);