import asyncHandler from 'express-async-handler';
import Tag from '../models/tagModel.js';


export const getAllTags = asyncHandler(async(req, res) => {
      const organizationId = req.params.organizationId;

      try {
            const tags = await Tag.find({organizationId: organizationId});
            res.json(tags);
      } catch(err) {
            res.status(500).json({message: "Server error on fetching tags"});
            throw new Error('Server error on fetching tags');
      }
});
  
  
export const getTagById = asyncHandler(async(req, res) => {
      try {
            const tag = await Tag.findById(req.params.id);
            res.json(tag);
      } catch(err) {
            res.status(404).json({message: "Tag not found"});
            throw new Error('Tag not found');
      }
});


export const addTag = asyncHandler(async(req, res) => {
      const name = req.body.name;
      const organizationId = req.body.organizationId;
      
      const newTag = new Tag ({
            name,
            organizationId,
      });

      try {
            await newTag.save();
            res.json(newTag);
      } catch(err) {
            res.status(400).json({message: "Can not save the tag"});
            throw new Error('Can not save the tag');
      }
});


export const updateTag = asyncHandler(async(req, res) => {
      const id = req.params.id;
      const update = { 
            $set: {
                  name: req.body.name,
            } 
      };
      const options =  {
            new: true, 
            useFindAndModify: false,
      };

      try {
            await Tag.findByIdAndUpdate(id, update, options);
      } catch(err) {
            res.status(400).json({message: "Update of tag unsuccessful"});
                  throw new Error('Update of tag unsuccessful');
      }
});


export const deleteTag = asyncHandler(async(req, res) => {
      try {
            await Tag.findByIdAndDelete(req.params.id);
            res.json();
      } catch(err) {
            res.status(404).json({message: "Tag not found"});
            throw new Error('Tag not found');
      }
});