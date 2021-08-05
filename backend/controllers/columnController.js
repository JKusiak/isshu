import Column from '../models/columnModel.js';
import asyncHandler from 'express-async-handler';


export const getAllColumns = asyncHandler(async(req, res) => {
      try {
            const columns = await Column.find({});
            res.json(columns);
      } catch(err) {
            res.status(500).json({message: "Server error on fetching columns"});
            throw new Error('Server error on fetching columns');
      }
      
  });
  
  
export const getColumnById = asyncHandler(async(req, res) => {
      try {
            const column = await Column.findById(req.params.id);
            res.json(column);
      } catch(err) {
            res.status(404).json({message: "Column not found"});
            throw new Error('Column not found');
      }
});


export const addColumn = asyncHandler(async(req, res) => {
      const name = req.body.columnName;
      
      const newColumn = new Column ({
            name,
      });

      try {
            const savedColumn = await newColumn.save();
            res.json(savedColumn);
      } catch(err) {
            res.status(400).json({message: "Can not save the column"});
            throw new Error('Can not save the column');
      }
});


export const updateColumn = asyncHandler(async(req, res) => {
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
            await Column.findByIdAndUpdate(id, update, options);
      } catch(err) {
            res.status(400).json({message: "Update of column unsuccessfull"});
            throw new Error('Update of column unsuccessfull');
      }
});


export const deleteColumn = asyncHandler(async(req, res) => {
      try {
            await Column.findByIdAndDelete(req.params.id);
      } catch(err) {
            res.status(404).json({message: "Column not found"});
            throw new Error('Column not found');
      }
});


export const getIssuesOfColumn = asyncHandler(async(req, res) => {
      try {
            const issues = await Column.findOne({_id: req.params.id})
                  .populate('issues');
            res.json(issues);
      } catch(err) {
            res.status(404).json({message: "Column not found"});
            throw new Error('Column not found');
      }
});


export const addIssueToColumn = asyncHandler(async(req, res) => {
      const id = req.params.id;
      const issueId = req.body.issueId;

      const update = {
          $push: {
              issues: issueId,
          } 
      };

      const options = {
          new: true, 
          useFindAndModify: false,
      };
  
      try {
            await Column.findByIdAndUpdate(id, update, options);
            res.json("Issue added to column successfuly");
      } catch(err) {
            res.status(400).json({message: "Could not add issue to column"});
            throw new Error('Could not add issue to column');
      }
});