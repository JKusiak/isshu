import Issue from '../models/issueModel.js';
import asyncHandler from 'express-async-handler';


export const getAllIssues = asyncHandler(async(req, res) => {
      const issues = await Issue.find({});
      
      res.json(issues);
});
  
  
export const getIssueById = asyncHandler(async(req, res) => {
      const issue = await Issue.findById(req.params.id);
      
      if(issue) {
            res.json(issue);
      } else {
            res.status(404).json({message: "Issue not found"});
            throw new Error('Issue not found');
      }
});


export const addIssue = asyncHandler(async(req, res) => {
      const name = req.body.name;
      
      const newIssue = new Issue ({
            name,
      });

      const savedIssue = await newIssue.save();

      if(savedIssue) {
            res.json('Issue saved successfully');
      } else {
            res.status(400).json({message: "Can not save the issue"});
            throw new Error('Can not save the issue');
      }
});


export const updateIssue = asyncHandler(async(req, res) => {
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

      Issue.findByIdAndUpdate(id, update, options, function(err, data) {
            if(err) {
                  res.status(400).json({message: "Update unsuccessful"});
                  throw new Error('Update unsuccessful');
            } else if(!data) {
                  res.status(404).json({message: "Issue not found"});
                  throw new Error('Issue not found');
            } else {
                  res.json("Issue updated successfuly");
            }
      });
});


export const deleteIssue = asyncHandler(async(req, res) => {
      const issue = await Issue.findByIdAndDelete(req.params.id);

      if(issue) {
            res.json("Issue deleted successfuly");
      } else {
            res.status(404).json({message: "Issue not found"});
            throw new Error('Issue not found');
      }
});


export const getTagsOfIssue = asyncHandler(async(req, res) => {
      const issues = await Issue.find({_id: req.params.id}).select({issues: 1});

      if(issues) {
            res.json(issues);
      } else {
            res.status(404).json({message: "Issue not found"});
            throw new Error('Issue not found');
      }
});


export const addTagToIssue = asyncHandler(async(req, res) => {
      const id = req.params.id;
      const update = {
          $push: {
            issues: req.body.issues,
          } 
      };
      const options = {
          new: true, 
          useFindAndModify: false,
      };
  
  
      // no await here, otherwise callback on update + await make execute twice
      Issue.findByIdAndUpdate(id, update, options, function(err, data){
          if(err) {
              res.status(400).json({message: "Update unsuccessful"});
              throw new Error('Update unsuccessful');
          } else if(!data) {
              res.status(404).json({message: "Issue not found"});
              throw new Error('Issue not found');
          } else {
              res.json("Issue's tags updated successfuly");
          }
      });
});


export const deleteTagFromIssue = asyncHandler(async(req, res) => {
      const id = req.params.id;
      const update = { 
          $pull: {
              "issues": {
                  _id: req.body.tagId,
              }
          } 
      };
      const options =  {
          safe: true, 
          upsert: true
      };
  
      Issue.findByIdAndUpdate(id, update, options, function(err, data){
          if(err) {
              res.status(400).json({message: "Update unsuccessful"});
              throw new Error('Update unsuccessful');
          } else if(!data) {
              res.status(404).json({message: "Issue not found"});
              throw new Error('Issue not found');
          } else {
              res.json("Issue updated successfuly");
          }
      });
});