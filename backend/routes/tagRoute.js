import express from 'express';
import { authenticateJWT } from '../controllers/authenticationController.js';
import {
      addTag, deleteTag, getAllTags,
      getTagById, updateTag
} from '../controllers/tagController.js';


export const protectedTagRouter = express.Router();

protectedTagRouter.use(authenticateJWT);

protectedTagRouter.route('/:organizationId').get(getAllTags);

protectedTagRouter.route('/:id').get(getTagById);

protectedTagRouter.route('/add').post(addTag);

protectedTagRouter.route('/update/:id').post(updateTag);

protectedTagRouter.route('/delete/:id').delete(deleteTag);
