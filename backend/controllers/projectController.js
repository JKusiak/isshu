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


export const updateProject = asyncHandler(async(req, res) => {
    const id = req.params.id;
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

    Project.findByIdAndUpdate(id, update, options, function(err, data) {
        if(err) {
            res.status(400).json({message: "Update unsuccessful"});
            throw new Error('Update unsuccessful');
        } else if(!data) {
            res.status(404).json({message: "Project not found"});
            throw new Error('Project not found');
        } else {
            res.json("Project updated successfuly");
        }
    });
});


export const deleteProject = asyncHandler(async(req, res) => {
    const project = await Project.findByIdAndDelete(req.params.id);

    if(project) {
        res.json("Project deleted successfuly");
    } else {
        res.status(404).json({message: "Project not found"});
        throw new Error('Project not found');
    }
});


export const getBoardsOfProject = asyncHandler(async(req, res) => {
    const boards = await Project.find({_id: req.params.id}).select({boards: 1});

    if(boards) {
        res.json(boards);
    } else {
        res.status(404).json({message: "Project not found"});
        throw new Error('Project not found');
    }
}); 


export const addBoardToProject = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const update = {
        $push: {
            boards: req.body.boardId,
        } 
    };
    const options = {
        new: true, 
        useFindAndModify: false,
    };


    // no await here, otherwise callback on update + await make execute twice
    Project.findByIdAndUpdate(id, update, options, function(err, data){
        if(err) {
            res.status(400).json({message: "Update unsuccessful"});
            throw new Error('Update unsuccessful');
        } else if(!data) {
            res.status(404).json({message: "Project not found"});
            throw new Error('Project not found');
        } else {
            res.json("Project's boards updated successfuly");
        }
    });
});


export const deleteBoardFromProject = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const update = { 
        $pullAll: {
            boards: [req.body.boardId],
        } 
    };
    const options =  {
        safe: true, 
        upsert: true
    };

    Project.findByIdAndUpdate(id, update, options, function(err, data){
        if(err) {
            res.status(400).json({message: "Update unsuccessful"});
            throw new Error('Update unsuccessful');
        } else if(!data) {
            res.status(404).json({message: "Project not found"});
            throw new Error('Project not found');
        } else {
            res.json("Project updated successfuly");
        }
    });
});