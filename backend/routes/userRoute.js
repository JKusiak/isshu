import { 
      getAllUsers,
      getUserById, 
      addUser,
      updateUser, 
      deleteUser,
      addProjectToUser,
      getProjectsByUser,
      deleteProjectFromUser,
      getIssuesCreatedByUser,
      addIssueCreatedToUser,
      deleteIssueCreatedFromUser,
      getIssuesTakenByUser,
      addIssueTakenToUser,
      deleteIssueTakenFromUser} from "../controllers/userController.js";
import express from 'express';

const router = express.Router()

router.route('/').get(getAllUsers);

router.route('/:id').get(getUserById);

router.route('/add').post(addUser);

router.route('/update/:id').post(updateUser);

router.route('/delete/:id').delete(deleteUser);

router.route('/getProject/:id').get(getProjectsByUser);

router.route('/addProject/:id').post(addProjectToUser);

router.route('/deleteProject/:id').delete(deleteProjectFromUser);

router.route('/getIssueCreated/:id').delete(getIssuesCreatedByUser);

router.route('/addIssueCreated/:id').delete(addIssueCreatedToUser);

router.route('/deleteIssueCreated/:id').delete(deleteIssueCreatedFromUser);

router.route('/getIssueTaken/:id').delete(getIssuesTakenByUser);

router.route('/addIssueTaken/:id').delete(addIssueTakenToUser);

router.route('/deleteIssueTaken/:id').delete(deleteIssueTakenFromUser);




export default router;