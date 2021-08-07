import express from 'express';
import { authenticateJWT } from '../controllers/authenticationController.js';
import {
      getAllColumns,
      getColumnById,
      addColumn,
      updateColumn,
      deleteColumn,
      getIssuesOfColumn,
      addIssueToColumn,
      deleteIssueFromColumn,
} from '../controllers/columnController.js';


export const protectedColumnRouter = express.Router();

protectedColumnRouter.use(authenticateJWT);

protectedColumnRouter.route('/').get(getAllColumns);

protectedColumnRouter.route('/:id').get(getColumnById);

protectedColumnRouter.route('/add').post(addColumn);

protectedColumnRouter.route('/update/:id').post(updateColumn);

protectedColumnRouter.route('/delete/:id').delete(deleteColumn);

protectedColumnRouter.route('/getIssues/:id').get(getIssuesOfColumn);

protectedColumnRouter.route('/addIssue/:id').post(addIssueToColumn);

protectedColumnRouter.route('/deleteIssue/:id').delete(deleteIssueFromColumn);