import express from 'express';
import { authenticateJWT } from '../controllers/authenticationController.js';
import {
      getAllBoards,
      getBoardById,
      getColumnsOfBoard,
      addBoard,
      updateBoard,
      deleteBoard,
} from '../controllers/boardController.js';


export const protectedBoardRouter = express.Router();

protectedBoardRouter.use(authenticateJWT);

protectedBoardRouter.route('/').get(getAllBoards);

protectedBoardRouter.route('/:id').get(getBoardById);

protectedBoardRouter.route('/getColumns/:boardId').get(getColumnsOfBoard);

protectedBoardRouter.route('/add').post(addBoard);

protectedBoardRouter.route('/update/:id').post(updateBoard);

protectedBoardRouter.route('/delete/:id').delete(deleteBoard);