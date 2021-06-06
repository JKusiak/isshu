import Project from '../models/projectModel.js';
import asyncHandler from 'express-async-handler';


export const getAllProjects = asyncHandler(async(req, res) => {
    const projects = await Project.find({});
    
    res.json(projects) ;
});


export const getProjectById = asyncHandler(async(req, res) => {
      const project = await Project.findById(req.params.id);
      
      if(project) {
            res.json(project);
      } else {
            res.status(404).json({message: "Project not found"});
            throw new Error('Project not found');
      }
});

export const addProject = asyncHandler(async(req, res) => {
      const name = req.body.name;
      const description = req.body.description;
      const dateStart = Date.parse(req.body.dateStart);
      const creator = req.body.creator;
      
      const newProject = new Project ({
            name,
            description,
            dateStart,
            creator,
      });

      const savedProject = await newProject.save();

      if(savedProject) {
            res.json('Project saved successfully');
      } else {
            res.status(400).json({message: "Can not save the project"});
            throw new Error('Can not save the project');
      }
});