
import express from 'express';
import { authenticateJWT } from '../controllers/authenticationController.js';
import {
      addIssue, addTagToIssue, deleteIssue, getAllIssues,
      getIssueById, getIssuesByContributor, getIssuesByCreator, getTagsOfIssue, updateIssue
} from '../controllers/issueController.js';


export const protectedIssueRouter = express.Router();

protectedIssueRouter.use(authenticateJWT);

protectedIssueRouter.route('/').get(getAllIssues);

protectedIssueRouter.route('/:id').get(getIssueById);

protectedIssueRouter.route('/add').post(addIssue);

protectedIssueRouter.route('/update/:id').post(updateIssue);

protectedIssueRouter.route('/delete/:id').delete(deleteIssue);

protectedIssueRouter.route('/getTags/:id').get(getTagsOfIssue);

protectedIssueRouter.route('/addTag/:id').post(addTagToIssue);

protectedIssueRouter.route('/getIssuesCreator/:id').get(getIssuesByCreator)

protectedIssueRouter.route('/getIssuesContributor/:id').get(getIssuesByContributor);