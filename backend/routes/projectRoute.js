
import express from 'express'
import { 
      getAllProjects, 
      getProjectById,
      addProject,
      updateProject,
      deleteProject,
      getBoardsOfProject,
      addBoardToProject,
      deleteBoardFromProject,
} from '../controllers/projectController.js';

const router = express.Router();

router.route('/').get(getAllProjects);

router.route('/:id').get(getProjectById);

router.route('/add').post(addProject);

router.route('/update/:id').post(updateProject);

router.route('/delete/:id').delete(deleteProject);

router.route('/getBoards:id').get(getBoardsOfProject);

router.route('/addBoard:id').post(addBoardToProject);

router.route('/deleteBoard:id').delete(deleteBoardFromProject);

export default router;