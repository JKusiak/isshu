import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';


// TODO simplify to get rid of boilerplate code for all API endpoints
export const getAllUsers = asyncHandler(async(req, res) => {
    try {
        const users = await User.find({});
        res.json(users) ;
    } catch(err) {
        res.status(500).json({message: "Server error on fetching users"});
        throw new Error('Server error on fetching users');
    }
});


export const getUserById = asyncHandler(async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch(err) {
        res.status(404).json({message: "User not found"});
        throw new Error('User not found');
    }
});


export const getLoggedUser = asyncHandler(async(req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json(user);
    } catch(err) {
        res.status(404).json({message: "User not found"});
        throw new Error('User not found');
    }
});


export const addUser = asyncHandler(async(req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;
    const isAdmin = req.body.isAdmin;

    const newUser = new User({
        name,
        surname,
        email,
        password,
        isAdmin,
    });


    const savedUser = await newUser.save();

    if(savedUser) {
        res.json(savedUser);
    } else {
        res.status(400).json({message: "Can not save the user"});
        throw new Error('Can not save the user');
    }
});

 
export const updateUser = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const update = { 
        $set: {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            isAdmin: req.body.isAdmin,
        } 
    };
    const options =  {
        new: true, 
        useFindAndModify: false,
    };

    try {
        await User.findByIdAndUpdate(id, update, options);
    } catch(err) {
        res.status(400).json({message: "Update of user unsuccessful"});
            throw new Error('Update of user unsuccessful');
    }
});


export const deleteUser = asyncHandler(async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
    } catch(err) {
        res.status(404).json({message: "User not found"});
        throw new Error('User not found');
    }
});


export const getProjectsOfUser = asyncHandler(async(req, res) => {
    try {
        const projects = await User.findOne({email: req.user.email})
            .populate('projects');
        res.json(projects);  
    } catch(err) {
        res.status(404).json({message: "User not found"});
        throw new Error('User not found');
    }
}); 


export const addProjectToUser = asyncHandler(async(req, res) => {
    const userId = req.params.id;
    const projectId = req.body.projectId;

    const update = {
         $push: {
            projects: projectId,
        } 
    };
    const options = {
        new: true, 
        useFindAndModify: false,
    };

    try {
        await User.findByIdAndUpdate(userId, update, options);
        res.json();
    } catch(err) {
        res.status(400).json({message: "Could not add project to user"});
        throw new Error('Update unsuccessful');
    }
});


export const deleteProjectFromUser = asyncHandler(async(req, res) => {
    const userId = req.params.id;
    const update = { 
        $pullAll: {
            projects: [req.body.projectId],
        } 
    };
    const options =  {
        new: true,
        useFindAndModify: false,
    };

    try {
        await User.findByIdAndUpdate(userId, update, options);

    } catch(err) {
        res.status(400).json({message: "Could not delete project from user"});
        throw new Error('Could not delete project from user');
    }
});


export const getUsersByProject = asyncHandler(async(req, res) => {
    const id = req.params.id;
    
    try {
        const users = await User.find({projects: id});
        res.json(users);  
    } catch(err) {
        res.status(404).json({message: "No users in this project"});
        throw new Error('No users in this project');
    }
});


export const getUsersWithoutProject = asyncHandler(async(req, res) => {
    const id = req.params.id;
    
    try {
        const users = await User.find({projects: {"$ne": id}});
        res.json(users);  
    } catch(err) {
        res.status(404).json({message: "No users without this project"});
        throw new Error('No users without this project');
    }
});