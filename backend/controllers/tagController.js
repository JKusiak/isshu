import Tag from '../models/tagModel.js';
import asyncHandler from 'express-async-handler';


export const getAllTags = asyncHandler(async(req, res) => {
      const tags = await Tag.find({});
      
      res.json(tags);
});
  
  
export const getTagById = asyncHandler(async(req, res) => {
      const tag = await Tag.findById(req.params.id);
      
      if(tag) {
            res.json(tag);
      } else {
            res.status(404).json({message: "Tag not found"});
            throw new Error('Tag not found');
      }
});

export const addTag = asyncHandler(async(req, res) => {
      const name = req.body.name;
      
      const newTag = new Tag ({
            name,
      });

      const savedTag = await newTag.save();

      if(savedTag) {
            res.json('Tag saved successfully');
      } else {
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

      Tag.findByIdAndUpdate(id, update, options, function(err, data) {
            if(err) {
                  res.status(400).json({message: "Update unsuccessful"});
                  throw new Error('Update unsuccessful');
            } else if(!data) {
                  res.status(404).json({message: "Tag not found"});
                  throw new Error('Tag not found');
            } else {
                  res.json("Tag updated successfuly");
            }
      });
});


export const deleteTag = asyncHandler(async(req, res) => {
      const tag = await Tag.findByIdAndDelete(req.params.id);

      if(tag) {
            res.json("Tag deleted successfuly");
      } else {
            res.status(404).json({message: "Tag not found"});
            throw new Error('Tag not found');
      }
});