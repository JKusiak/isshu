import express from 'express';
import { 
      getAllUsers,
      getUserById, 
      addUser,
      updateUser, 
      deleteUser,
      addProjectToUser,
      getProjectsOfUser,
      deleteProjectFromUser,
} from "../controllers/userController.js";


const router = express.Router();

router.route('/').get(getAllUsers);

router.route('/:id').get(getUserById);

router.route('/add').post(addUser);

router.route('/update/:id').post(updateUser);

router.route('/delete/:id').delete(deleteUser);

router.route('/getProjects/:id').get(getProjectsOfUser);

router.route('/addProject/:id').post(addProjectToUser);

router.route('/deleteProject/:id').delete(deleteProjectFromUser);

export default router;