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
    const user = await User.findById(req.params.id);

    if(user) {
        user.name = req.body.name;
        user.surname = req.body.surname;
        user.email = req.body.email;
        user.password = req.body.password;
        user.isAdmin = req.body.isAdmin;

        const updatedUser = await user.save();

        if (updatedUser) {
            res.json("User updated successfuly");
            res.json(updatedUser);
        } else {
            res.status(400).json({message: "Update unsuccessful"});
            throw new Error('Update unsuccessful');
        }
    } else {
        res.status(404).json({message: "User not found"});
        throw new Error('User not found');
    }

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

