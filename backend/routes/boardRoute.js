import express from 'express';
import {
      getAllBoards,
      getBoardById,
      addBoard,
      updateBoard,
      deleteBoard,
      getColumnsOfBoard,
      addColumnToBoard,
      deleteColumnFromBoard
} from '../controllers/boardController.js';

const router = express.Router();

router.route('/').get(getAllBoards);

router.route('/:id').get(getBoardById);

router.route('/add').post(addBoard);

router.route('/update/:id').post(updateBoard);

router.route('/delete/:id').delete(deleteBoard);

router.route('/getColumns:id').get(getColumnsOfBoard);

router.route('/addColumn:id').post(addColumnToBoard);

router.route('/deleteColumn:id').delete(deleteColumnFromBoard);

export default router;