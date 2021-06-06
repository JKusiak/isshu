
import express from 'express'
import { addProject, getAllProjects, getProjectById } from '../controllers/projectController.js';

const router = express.Router()

router.route('/').get(getAllProjects);

router.route('/:id').get(getProjectById);

router.route('/add').post(addProject);

export default router;