import express from 'express';
import {
      addTag, deleteTag, getAllTags,
      getTagById, updateTag
} from '../controllers/tagController.js';


const router = express.Router();

router.route('/:organizationId').get(getAllTags);

router.route('/:id').get(getTagById);

router.route('/add').post(addTag);

router.route('/update/:id').post(updateTag);

router.route('/delete/:id').delete(deleteTag);

export default router;