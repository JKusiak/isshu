import express from 'express';
import { authenticateJWT } from '../controllers/authenticationController.js';
import { 
      getAllUsers,
      getUserById,
      getLoggedUser, 
      addUser,
      updateUser, 
      deleteUser,
      addProjectToUser,
      getProjectsOfUser,
      deleteProjectFromUser,
      getUsersByProject,
      getUsersWithoutProject
} from "../controllers/userController.js";


export const protectedUserRouter = express.Router();

export const userRouter = express.Router();

protectedUserRouter.use(authenticateJWT);

protectedUserRouter.route('/').get(getAllUsers);

protectedUserRouter.route('/:id').get(getUserById);

protectedUserRouter.route('/profile/token').get(getLoggedUser);

userRouter.route('/add').post(addUser);

protectedUserRouter.route('/update/:id').post(updateUser);

protectedUserRouter.route('/delete/:id').delete(deleteUser);

protectedUserRouter.route('/getProjects/:id').get(getProjectsOfUser);

protectedUserRouter.route('/addProject/:id').post(addProjectToUser);

protectedUserRouter.route('/deleteProject/:id').delete(deleteProjectFromUser);

protectedUserRouter.route('/getUsersByProject/:id').get(getUsersByProject);

protectedUserRouter.route('/getUsersWithoutProject/:id').get(getUsersWithoutProject);