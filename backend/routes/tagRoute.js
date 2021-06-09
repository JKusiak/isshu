import express from 'express'
import { 
      getAllTags,
      getTagById,
      addTag,
      updateTag,
      deleteTag,
} from '../controllers/tagController.js';


const router = express.Router();

router.route('/').get(getAllTags);

router.route('/:id').get(getTagById);

router.route('/add').post(addTag);

router.route('/update/:id').post(updateTag);

router.route('/delete/:id').delete(deleteTag);

export default router;