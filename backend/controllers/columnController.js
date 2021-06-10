import Column from '../models/columnModel.js';
import asyncHandler from 'express-async-handler';


export const getAllColumns = asyncHandler(async(req, res) => {
      const columns = await Column.find({});
      
      res.json(columns);
  });
  
  
export const getColumnById = asyncHandler(async(req, res) => {
      const column = await Column.findById(req.params.id);
      
      if(column) {
            res.json(column);
      } else {
            res.status(404).json({message: "Column not found"});
            throw new Error('Column not found');
      }
});


export const addColumn = asyncHandler(async(req, res) => {
      const name = req.body.name;
      
      const newColumn = new Column ({
            name,
      });

      const savedColumn = await newColumn.save();

      if(savedColumn) {
            res.json('Column saved successfully');
      } else {
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

      Column.findByIdAndUpdate(id, update, options, function(err, data) {
            if(err) {
                  res.status(400).json({message: "Update unsuccessful"});
                  throw new Error('Update unsuccessful');
            } else if(!data) {
                  res.status(404).json({message: "Column not found"});
                  throw new Error('Column not found');
            } else {
                  res.json("Column updated successfuly");
            }
      });
});


export const deleteColumn = asyncHandler(async(req, res) => {
      const column = await Column.findByIdAndDelete(req.params.id);

      if(column) {
            res.json("Column deleted successfuly");
      } else {
            res.status(404).json({message: "Column not found"});
            throw new Error('Column not found');
      }
});


export const getIssuesOfColumn = asyncHandler(async(req, res) => {
      const issues = await Column.find({_id: req.params.id}).select({issues: 1});

      if(issues) {
            res.json(issues);
      } else {
            res.status(404).json({message: "Column not found"});
            throw new Error('Column not found');
      }
});


export const addIssueToColumn = asyncHandler(async(req, res) => {
      const id = req.params.id;
      const update = {
          $push: {
              issues: req.body.issueId,
          } 
      };
      const options = {
          new: true, 
          useFindAndModify: false,
      };
  
  
      // no await here, otherwise callback on update + await make execute twice
      Column.findByIdAndUpdate(id, update, options, function(err, data){
          if(err) {
              res.status(400).json({message: "Update unsuccessful"});
              throw new Error('Update unsuccessful');
          } else if(!data) {
              res.status(404).json({message: "Column not found"});
              throw new Error('Column not found');
          } else {
              res.json("Column's issues updated successfuly");
          }
      });
});


export const deleteIssueFromColumn = asyncHandler(async(req, res) => {
      const id = req.params.id;
      const update = {
            $pullAll: {
                  issues: [req.body.issueId],
            } 
      };
      const options =  {
          safe: true, 
          upsert: true
      };
  
      Column.findByIdAndUpdate(id, update, options, function(err, data){
          if(err) {
              res.status(400).json({message: "Update unsuccessful"});
              throw new Error('Update unsuccessful');
          } else if(!data) {
              res.status(404).json({message: "Column not found"});
              throw new Error('Column not found');
          } else {
              res.json("Column updated successfuly");
          }
      });
  });