import express from 'express';
import { authenticateJWT } from '../controllers/authenticationController.js';
import {
      addProject, deleteProject, getAllProjects, getBoardsOfProject, getIssuesProgress, getProjectById, updateProject
} from '../controllers/projectController.js';


export const protectedProjectRouter = express.Router();

protectedProjectRouter.use(authenticateJWT);

protectedProjectRouter.route('/').get(getAllProjects);

protectedProjectRouter.route('/:projectId').get(getProjectById);

protectedProjectRouter.route('/getProgress/:projectId').get(getIssuesProgress);

protectedProjectRouter.route('/getBoards/:projectId').get(getBoardsOfProject);

protectedProjectRouter.route('/add').post(addProject);

protectedProjectRouter.route('/update/:projectId').post(updateProject);

protectedProjectRouter.route('/delete/:projectId').delete(deleteProject);
