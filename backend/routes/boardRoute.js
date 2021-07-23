import express from 'express';
import { authenticateJWT } from '../controllers/authenticationController.js';
import {
      getAllBoards,
      getBoardById,
      addBoard,
      updateBoard,
      deleteBoard,
      getAllBoardContent,
      addColumnToBoard,
      deleteColumnFromBoard,
} from '../controllers/boardController.js';

export const protectedBoardRouter = express.Router();

protectedBoardRouter.use(authenticateJWT);

protectedBoardRouter.route('/').get(getAllBoards);

protectedBoardRouter.route('/:id').get(getBoardById);

protectedBoardRouter.route('/add').post(addBoard);

protectedBoardRouter.route('/update/:id').post(updateBoard);

protectedBoardRouter.route('/delete/:id').delete(deleteBoard);

protectedBoardRouter.route('/getContent/:id').get(getAllBoardContent);

protectedBoardRouter.route('/addColumn/:id').post(addColumnToBoard);

protectedBoardRouter.route('/deleteColumn/:id').delete(deleteColumnFromBoard);

export default protectedBoardRouter;