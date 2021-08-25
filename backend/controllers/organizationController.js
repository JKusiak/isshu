import asyncHandler from 'express-async-handler';
import Organization from '../models/organizationModel.js';
import Project from '../models/projectModel.js';
import User from '../models/userModel.js';


export const getAllOrganizations = asyncHandler(async(req, res) => {
    try {
        const organizations = await Organization.find({});
        res.json(organizations) ;
    } catch(err) {
        res.status(500).json({message: "Server error on fetching organizations"});
        throw new Error('Server error on fetching organizations');
    }
});


export const getOrganizationById = asyncHandler(async(req, res) => {
    const organizationId = req.params.organizationId;

    try {
        const organization = await Organization.findOne({_id: organizationId})
			.populate({
				path: 'archivedIssues',
				select: 'name description',
				model: 'Issue',
			})
        res.json(organization);
    } catch(err) {
        res.status(404).json({message: "Organization not found"});
        throw new Error('Organization not found');
    }
});


export const getProjectsOfOrganization = asyncHandler(async(req, res) => {
	const organizationId = req.params.organizationId;
	
	try {
		const projects = await Project.find({organizationId: organizationId})
			.select('name description');
        res.json(projects);
    } catch(err) {
        res.status(404).json({message: "Projects not found"});
        throw new Error('Projects not found');
    }
});


export const getMembersOfOrganization = asyncHandler(async(req, res) => {
	const organizationId = req.params.organizationId;
	
	try {
		const projects = await User.find({organizationId: organizationId})
			.select('name surname');
        res.json(projects);
    } catch(err) {
        res.status(404).json({message: "Projects not found"});
        throw new Error('Projects not found');
    }
});


export const addOrganization = asyncHandler(async(req, res) => {
    const name = req.body.name;
    
    const newOrganization = new Organization ({
        name,
    });

    try {
        const savedOrganization = await newOrganization.save();
        res.json(savedOrganization);
    } catch(err) {
        res.status(400).json({message: "Can not save the organization"});
        throw new Error('Can not save the organization');
    }
});


export const updateOrganization = asyncHandler(async(req, res) => {
    const organizationId = req.params.organizationId;
    
    const update = { 
        $set: req.body
    };
    
    const options =  {
        new: true, 
        useFindAndModify: false,
    };

    try {
        const organization = await Organization.findByIdAndUpdate(organizationId, update, options);
		res.json(organization);
    }
    catch(err) {
        res.status(400).json({message: "Update of organization unsuccessful"});
        throw new Error('Update of organization unsuccessful');
    }
});


export const deleteOrganization = asyncHandler(async(req, res) => {
    try {
        const organizationId = req.params.organizationId;
        await Organization.findByIdAndDelete(organizationId);
        return res.status(204);
    } catch(err) {
       console.log(err);
    }
});