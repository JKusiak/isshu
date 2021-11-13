import asyncHandler from 'express-async-handler';
import Issue from '../models/issueModel.js';


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
      const name = req.body.name;
      const creator = req.body.creator;
      const columnId = req.body.columnId;

      const newIssue = new Issue({
            name,
            creator,
            columnId,
      });

      try {
            const savedIssue = await newIssue.save();
            const populatedIssue = await Issue.findById(savedIssue._id)
                  .populate({
                        path: 'creator',
                        select: 'name surname organizationId',
                        model: 'User',
                  })
            res.json(populatedIssue);
      } catch(err) {
            res.status(400).json({message: "Can not save the issue"});
            throw new Error('Can not save the issue');
      }
});


export const updateIssue = asyncHandler(async(req, res) => {
      const id = req.params.id;
      const update = { 
            $set: req.body
      };
      const options =  {
            new: true, 
            useFindAndModify: false,
      };

      try {
            const updatedIssue = await Issue.findByIdAndUpdate(id, update, options);
            const populatedUpdatedIssue = await Issue.findById(updatedIssue._id)
                  .populate([{
                        path: 'tags',
                        model: 'Tag',
                  },{
                        path: 'creator',
                        select: 'name surname',
                        model: 'User',
                  },{
                        path: 'contributors',
                        select: 'name surname',
                        model: 'User',
                  },{
                        path: 'messages',
                        populate: {
                              path: 'sender',
                              select: 'name surname',
                              model: 'User',
                        },
                  }]);
            res.json(populatedUpdatedIssue);
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


export const getIssuesByCreator = asyncHandler(async(req, res) => {
      try {
            const issues = await Issue.find({creator: req.params.id}).populate([{
                  path: 'tags',
                  model: 'Tag',
            },{
                  path: 'creator',
                  select: 'name surname',
                  model: 'User',
            },{
                  path: 'contributors',
                  select: 'name surname',
                  model: 'User',
            },{
                  path: 'messages',
                  populate: {
                        path: 'sender',
                        select: 'name surname',
                        model: 'User',
                  },
            }]);
            res.json(issues);
      } catch(err) {
            res.status(404).json({message: "Issues of creator not found"});
            throw new Error('Issue not found');
      }
});


export const getIssuesByContributor = asyncHandler(async(req, res) => {
      try {
            const issues = await Issue.find({contributors: {$all: [req.params.id]}}).populate([{
                  path: 'tags',
                  model: 'Tag',
            },{
                  path: 'creator',
                  select: 'name surname',
                  model: 'User',
            },{
                  path: 'contributors',
                  select: 'name surname',
                  model: 'User',
            },{
                  path: 'messages',
                  populate: {
                        path: 'sender',
                        select: 'name surname',
                        model: 'User',
                  },
            }]);
            res.json(issues);
      } catch(err) {
            res.status(404).json({message: "Issues of contributor not found"});
            throw new Error('Issue not found');
      }
});