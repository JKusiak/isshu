import express from 'express';
import { authenticateJWT } from '../controllers/authenticationController.js';
import {
      getAllColumns,
      getColumnById,
      getIssuesOfColumn,
      addColumn,
      updateColumn,
      deleteColumn,
} from '../controllers/columnController.js';


export const protectedColumnRouter = express.Router();

protectedColumnRouter.use(authenticateJWT);

protectedColumnRouter.route('/').get(getAllColumns);

protectedColumnRouter.route('/:columnId').get(getColumnById);

protectedColumnRouter.route('/getIssues/:columnId').get(getIssuesOfColumn);

protectedColumnRouter.route('/add').post(addColumn);

protectedColumnRouter.route('/update/:columnId').post(updateColumn);

protectedColumnRouter.route('/delete/:columnId').delete(deleteColumn);