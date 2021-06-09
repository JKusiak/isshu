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
      getIssuesCreatedByUser,
      addIssueCreatedToUser,
      deleteIssueCreatedFromUser,
      getIssuesTakenByUser,
      addIssueTakenToUser,
      deleteIssueTakenFromUser,
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

router.route('/getIssuesCreated/:id').get(getIssuesCreatedByUser);

router.route('/addIssueCreated/:id').post(addIssueCreatedToUser);

router.route('/deleteIssueCreated/:id').delete(deleteIssueCreatedFromUser);

router.route('/getIssuesTaken/:id').get(getIssuesTakenByUser);

router.route('/addIssueTaken/:id').post(addIssueTakenToUser);

router.route('/deleteIssueTaken/:id').delete(deleteIssueTakenFromUser);




export default router;