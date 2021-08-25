import express from 'express';
import { authenticateJWT } from '../controllers/authenticationController.js';
import {
	addOrganization, deleteOrganization, getAllOrganizations, getMembersOfOrganization, getOrganizationById,
	getProjectsOfOrganization, updateOrganization
} from '../controllers/organizationController.js';


export const protectedOrganizationRouter = express.Router();

protectedOrganizationRouter.use(authenticateJWT);

protectedOrganizationRouter.route('/').get(getAllOrganizations);

protectedOrganizationRouter.route('/:organizationId').get(getOrganizationById);

protectedOrganizationRouter.route('/projects/:organizationId').get(getProjectsOfOrganization);

protectedOrganizationRouter.route('/members/:organizationId').get(getMembersOfOrganization);

protectedOrganizationRouter.route('/add').post(addOrganization);

protectedOrganizationRouter.route('/update/:organizationId').post(updateOrganization);

protectedOrganizationRouter.route('/delete/:organizationId').delete(deleteOrganization);

