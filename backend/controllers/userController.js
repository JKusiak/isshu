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

    if (user) {
        res.json("User deleted successfuly");
    } else {
        res.status(404).json({message: "User not found"});
        throw new Error('User not found');
    }
});


export const addProjectToUser = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const update = {
         $push: {
            projects: req.body.projects,
        } 
    };
    const options = {
        new: true, 
        useFindAndModify: false,
    };

    const user = await User.findByIdAndUpdate(id, update, options, function(err, data){
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



export const addBoardToUser = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const update = {
         $push: {
            boards: board._id,
        } 
    };
    const options = {
        new: true, 
        useFindAndModify: false,
    };

    const user = await User.findByIdAndUpdate(id, update, options, function(err, data){
        if(err) {
            res.status(400).json({message: "Update unsuccessful"});
            throw new Error('Update unsuccessful');
        } else if(!data) {
            res.status(404).json({message: "User not found"});
            throw new Error('User not found');
        } else {
            res.json("User's boards updated successfuly");
        }
    });
});


export const addIssueCreatedToUser = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const update = {
         $push: {
            issuesCreate: issueCreated._id,
        } 
    };
    const options = {
        new: true, 
        useFindAndModify: false,
    };

    const user = await User.findByIdAndUpdate(id, update, options, function(err, data){
        if(err) {
            res.status(400).json({message: "Update unsuccessful"});
            throw new Error('Update unsuccessful');
        } else if(!data) {
            res.status(404).json({message: "User not found"});
            throw new Error('User not found');
        } else {
            res.json("User's boards updated successfuly");
        }
    });

});


export const addIssueTakenToUser = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const update = {
         $push: {
            issuesTaken: issueTaken._id,
        } 
    };
    const options = {
        new: true, 
        useFindAndModify: false,
    };

    const user = await User.findByIdAndUpdate(id, update, options, function(err, data){
        if(err) {
            res.status(400).json({message: "Update unsuccessful"});
            throw new Error('Update unsuccessful');
        } else if(!data) {
            res.status(404).json({message: "User not found"});
            throw new Error('User not found');
        } else {
            res.json("User's boards updated successfuly");
        }
    });

});


async function addToUser(documentType, req, res) {
    const id = req.params.id;
    const documentPlural = documentType + 's';

    const update = {
         $push: {
            [`${documentPlural}`]: documentType._id,
        } 
    };
    const options = {
        new: true, 
        useFindAndModify: false,
    };

    const user = await User.findByIdAndUpdate(id, update, options, function(err, data){
        if(err) {
            res.status(400).json({message: "Update unsuccessful"});
            throw new Error('Update unsuccessful');
        } else if(!data) {
            res.status(404).json({message: "User not found"});
            throw new Error('User not found');
        } else {
            res.json("User's boards updated successfuly");
        }
    });
}