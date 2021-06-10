
import express from 'express'
import { 
      getAllIssues, 
      getIssueById,
      addIssue,
      updateIssue,
      deleteIssue,
      getTagsOfIssue,
      addTagToIssue,
      deleteTagFromIssue,
} from '../controllers/issueController.js';


const router = express.Router();

router.route('/').get(getAllIssues);

router.route('/:id').get(getIssueById);

router.route('/add').post(addIssue);

router.route('/update/:id').post(updateIssue);

router.route('/delete/:id').delete(deleteIssue);

router.route('/getTags/:id').get(getTagsOfIssue);

router.route('/addTag/:id').post(addTagToIssue);

router.route('/deleteTag/:id').delete(deleteTagFromIssue);

export default router;