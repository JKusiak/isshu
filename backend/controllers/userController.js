import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';


export const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find({});
    
    res.json(users) ;
});


export const getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);

    if(user) {
        res.json(user);
    } else {
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
        res.json('User saved successfully');
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
            password: req.body.password,
            isAdmin: req.body.isAdmin,
        } 
    };
    const options =  {
        new: true, 
        useFindAndModify: false,
    };

    User.findByIdAndUpdate(id, update, options, function(err, data) {
        if(err) {
            res.status(400).json({message: "Update unsuccessful"});
            throw new Error('Update unsuccessful');
        } else if(!data) {
            res.status(404).json({message: "User not found"});
            throw new Error('User not found');
        } else {
            res.json("User updated successfuly");
        }
    });
});


export const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if(user) {
        res.json("User deleted successfuly");
    } else {
        res.status(404).json({message: "User not found"});
        throw new Error('User not found');
    }
});


// TODO simplify to get rid of boilerplate code for all API endpoints
export const getProjectsOfUser = asyncHandler(async(req, res) => {

    const projects = await User.findOne({_id: req.params.id})
        .populate('projects');

    // const projectIDs = await User.find({_id: req.params.id}).select({projects: 1});
    // const scrapedIDs = projectIDs[0].projects;
    // const projects = await Project.find({_id: {$in: [scrapedIDs]}});

    if(projects) {
        res.json(projects);   
    } else {
        res.status(404).json({message: "User not found"});
        throw new Error('User not found');
    }
}); 


export const addProjectToUser = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const update = {
         $push: {
            projects: req.body.projectId,
        } 
    };
    const options = {
        new: true, 
        useFindAndModify: false,
    };


    // no await here, otherwise callback on update + await make execute twice
    const user = User.findByIdAndUpdate(id, update, options, function(err, data){
        if(err) {
            res.status(400).json({message: "Update unsuccessful"});
            throw new Error('Update unsuccessful');
        } else if(!data) {
            res.status(404).json({message: "User not found"});
            throw new Error('User not found');
        } else {
            res.json("User's projects updated successfuly");
        }
    });
});


export const deleteProjectFromUser = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const update = { 
        $pullAll: {
            projects: [req.body.projectId],
        } 
    };
    const options =  {
        new: true,
    };

    User.findByIdAndUpdate(id, update, options, function(err, data){
        if(err) {
            res.status(400).json({message: "Update unsuccessful"});
            throw new Error('Update unsuccessful');
        } else if(!data) {
            res.status(404).json({message: "User not found"});
            throw new Error('User not found');
        } else {
            res.json("User updated successfuly");
        }
    });
});


// async function addToUser(documentType, req, res) {
//     const id = req.params.id;

//     const update = {
//          $push: {
//             [`${documentType}`]: req.body.documentType,
//         } 
//     };
//     const options = {
//         new: true, 
//         useFindAndModify: false,
//     };

//     const user = await User.findByIdAndUpdate(id, update, options, function(err, data){
//         if(err) {
//             res.status(400).json({message: "Update unsuccessful"});
//             throw new Error('Update unsuccessful');
//         } else if(!data) {
//             res.status(404).json({message: "User not found"});
//             throw new Error('User not found');
//         } else {
//             res.json(`User's ${documentType} updated successfuly`);
//         }
//     });
// }