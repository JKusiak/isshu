import Project from '../models/projectModel.js';
import Board from '../models/boardModel.js';
import asyncHandler from 'express-async-handler';


export const getAllProjects = asyncHandler(async(req, res) => {
    try {
        const projects = await Project.find({});
        res.json(projects) ;
    } catch(err) {
        res.status(500).json({message: "Server error on fetching projects"});
        throw new Error('Server error on fetching projects');
    }
});


export const getProjectById = asyncHandler(async(req, res) => {
    const projectId = req.params.projectId;

    try {
        const project = await Project.findOne({_id: projectId})
            .populate('creator');
        res.json(project);
    } catch(err) {
        res.status(404).json({message: "Project not found"});
        throw new Error('Project not found');
    }
});


export const getBoardsOfProject = asyncHandler(async(req, res) => {
    const projectId = req.params.projectId;

    try {
        const boards = await Board.find({projectId: projectId})
        res.json(boards);
    } catch(err) {
        res.status(404).json({message: "Project not found"});
        throw new Error('Project not found');
    }
}); 


export const addProject = asyncHandler(async(req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const dateStart = req.body.dateStart;
    const dateEnd = req.body.dateEnd;
    const creator = req.body.creator;
    
    const newProject = new Project ({
        name,
        description,
        dateStart,
        dateEnd,
        creator,
    });

    try {
        const savedProject = await newProject.save();
        res.json(savedProject);
    } catch(err) {
        res.status(400).json({message: "Can not save the project"});
        throw new Error('Can not save the project');
    }
});


export const updateProject = asyncHandler(async(req, res) => {
    const projectId = req.params.projectId;
    
    const update = { 
        $set: {
            name: req.body.name,
            description: req.body.description,
            dateStart: req.body.dateStart,
            dateEnd: req.body.dateEnd,
            creator: req.body.creator,
        } 
    };
    
    const options =  {
        new: true, 
        useFindAndModify: false,
    };

    try {
        await Project.findByIdAndUpdate(projectId, update, options);
    }
    catch(err) {
        res.status(400).json({message: "Update of project unsuccessful"});
        throw new Error('Update of project unsuccessful');
    }
});


export const deleteProject = asyncHandler(async(req, res) => {
    try {
        const projectId = req.params.projectId;
        const deletedProject = await Project.findByIdAndDelete(projectId);
        return res.status(204).json(deletedProject);
    } catch(err) {
       console.log(err);
    }
});

