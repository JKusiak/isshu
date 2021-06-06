import { 
      getAllUsers,
      getUserById, 
      addUser,
      updateUser, 
      deleteUser,
      addProjectToUser} from "../controllers/userController.js";
import express from 'express';

const router = express.Router()

router.route('/').get(getAllUsers);

router.route('/:id').get(getUserById);

router.route('/add').post(addUser);

router.route('/update/:id').post(updateUser);

router.route('/delete/:id').delete(deleteUser);

router.route('/addProject/:id').post(addProjectToUser);

export default router;