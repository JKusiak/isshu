import express from 'express';
import { authenticateJWT } from '../controllers/authenticationController.js';
import { 
      getAllProjects, 
      getProjectById,
      addProject,
      updateProject,
      deleteProject,
      getBoardsOfProject,
      addBoardToProject,
} from '../controllers/projectController.js';


export const protectedProjectRouter = express.Router();

protectedProjectRouter.use(authenticateJWT);

protectedProjectRouter.route('/').get(getAllProjects);

protectedProjectRouter.route('/:id').get(getProjectById);

protectedProjectRouter.route('/add').post(addProject);

protectedProjectRouter.route('/update/:id').post(updateProject);

protectedProjectRouter.route('/delete/:id').delete(deleteProject);

protectedProjectRouter.route('/getBoards/:id').get(getBoardsOfProject);

protectedProjectRouter.route('/addBoard/:id').post(addBoardToProject);