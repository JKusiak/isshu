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
      deleteIssueTakenFromUser} from "../controllers/userController.js";
import express from 'express';

const router = express.Router()

router.route('/').get(getAllUsers);

router.route('/:id').get(getUserById);

router.route('/add').post(addUser);

router.route('/update/:id').post(updateUser);

router.route('/delete/:id').delete(deleteUser);

router.route('/getProjects/:id').get(getProjectsOfUser);

router.route('/addProject/:id').post(addProjectToUser);

router.route('/deleteProject/:id').delete(deleteProjectFromUser);

router.route('/getIssuesCreated/:id').delete(getIssuesCreatedByUser);

router.route('/addIssueCreated/:id').delete(addIssueCreatedToUser);

router.route('/deleteIssueCreated/:id').delete(deleteIssueCreatedFromUser);

router.route('/getIssuesTaken/:id').delete(getIssuesTakenByUser);

router.route('/addIssueTaken/:id').delete(addIssueTakenToUser);

router.route('/deleteIssueTaken/:id').delete(deleteIssueTakenFromUser);




export default router;