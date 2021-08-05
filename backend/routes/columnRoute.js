import express from 'express';
import {
      getAllColumns,
      getColumnById,
      addColumn,
      updateColumn,
      deleteColumn,
      getIssuesOfColumn,
      addIssueToColumn,
} from '../controllers/columnController.js';


const router = express.Router();

router.route('/').get(getAllColumns);

router.route('/:id').get(getColumnById);

router.route('/add').post(addColumn);

router.route('/update/:id').post(updateColumn);

router.route('/delete/:id').delete(deleteColumn);

router.route('/getIssues/:id').get(getIssuesOfColumn);

router.route('/addIssue/:id').post(addIssueToColumn);

export default router;