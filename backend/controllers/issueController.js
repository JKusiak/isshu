import Issue from '../models/issueModel.js';
import asyncHandler from 'express-async-handler';


export const getAllIssues = asyncHandler(async(req, res) => {
      try {
            const issues = await Issue.find({});
            res.json(issues);
      } catch(err) {
            res.status(500).json({message: "Server error on fetching issues"});
            throw new Error('Server error on fetching issues');
      }
      
});
  
  
export const getIssueById = asyncHandler(async(req, res) => {
      try {
            const issue = await Issue.findById(req.params.id);
            res.json(issue);
      } catch(err) {
            res.status(404).json({message: "Issue not found"});
            throw new Error('Issue not found');
      }
});


export const addIssue = asyncHandler(async(req, res) => {
      const description = req.body.description;
      const creator = req.body.creator;
      
      const newIssue = new Issue({
            description,
            creator,
      });

      try {
            const savedIssue = await newIssue.save();
            res.json(savedIssue);
      } catch(err) {
            res.status(400).json({message: "Can not save the issue"});
            throw new Error('Can not save the issue');
      }
});


export const updateIssue = asyncHandler(async(req, res) => {
      const id = req.params.id;
      const update = { 
            $set: {
                  description: req.body.description,
                  contributor: req.body.contributor,
            } 
      };
      const options =  {
            new: true, 
            useFindAndModify: false,
      };

      try {
            await  Issue.findByIdAndUpdate(id, update, options);
      } catch(err) {
            res.status(400).json({message: "Update of issue unsuccessful"});
                  throw new Error('Update of issue unsuccessful');
      }
});


export const deleteIssue = asyncHandler(async(req, res) => {
      try {
            await Issue.findByIdAndDelete(req.params.id);
      } catch(err) {
            res.status(404).json({message: "Issue not found"});
            throw new Error('Issue not found');
      }
});


export const getTagsOfIssue = asyncHandler(async(req, res) => {
      try {
            const tags = await Issue.findOne({_id: req.params.id})
                  .populate('tags');
            res.json(tags);
      } catch(err) {
            res.status(404).json({message: "Issue not found"});
            throw new Error('Issue not found');
      }
});


export const addTagToIssue = asyncHandler(async(req, res) => {
      const id = req.params.id;
      const update = {
          $push: {
            tags: req.body.tagId,
          } 
      };
      const options = {
          new: true, 
          useFindAndModify: false,
      };
  
      try {
            await Issue.findByIdAndUpdate(id, update, options);
      } catch(err) {
            res.status(400).json({message: "Could not add tag to issue"});
            throw new Error('Could not add tag to issue');
      }
});


export const deleteTagFromIssue = asyncHandler(async(req, res) => {
      const id = req.params.id;
      const update = { 
            $pullAll: {
                tags: [req.body.tagId],
            } 
      };
      const options =  {
          safe: true, 
          upsert: true
      };

      try {
            await Issue.findByIdAndUpdate(id, update, options);
      } catch(err) {
            res.status(400).json({message: "Could not delete tag from issue"});
            throw new Error('Could not delete tag from issue');
      }
});


export const getIssuesByCreator = asyncHandler(async(req, res) => {
      try {
            const issue = await Issue.find({creator: req.params.id});
            res.json(issue);
      } catch(err) {
            res.status(404).json({message: "Issues of creator not found"});
            throw new Error('Issue not found');
      }
});


export const getIssuesByContributor = asyncHandler(async(req, res) => {
      try {
            const issue = await Issue.find({contributor: req.params.id});
            res.json(issue);
      } catch(err) {
            res.status(404).json({message: "Issues of contributor not found"});
            throw new Error('Issue not found');
      }
});