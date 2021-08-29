import asyncHandler from 'express-async-handler';
import Column from '../models/columnModel.js';
import Issue from '../models/issueModel.js';


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
            const column = await Column.findById(req.params.columnId);
            res.json(column);
      } catch(err) {
            res.status(404).json({message: "Column not found"});
            throw new Error('Column not found');
      }
});

export const getIssuesOfColumn = asyncHandler(async(req, res) => {
      const columnId = req.params.columnId;
  
      try {
          const issues = await Issue.find({columnId: columnId})
          res.json(issues);
      } catch(err) {
          res.status(404).json({message: "Project not found"});
          throw new Error('Project not found');
      }
});


export const addColumn = asyncHandler(async(req, res) => {
      const name = req.body.columnName;
      const boardId = req.body.boardId;

      const newColumn = new Column ({
            name,
            boardId,
      });

      try {
            const savedColumn = await newColumn.save();
            res.json(savedColumn);
      } catch(err) {
            res.status(400).json({message: "Can not save the board"});
            throw new Error('Can not save the board');
      }
});


export const updateColumn = asyncHandler(async(req, res) => {
      const id = req.params.columnId;

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
            const updatedColumn = await Column.findByIdAndUpdate(id, update, options);
            res.json(updatedColumn);
      } catch(err) {
            res.status(400).json({message: "Update of column unsuccessfull"});
            throw new Error('Update of column unsuccessfull');
      }
});


export const deleteColumn = asyncHandler(async(req, res) => {
      try {
            await Column.findByIdAndDelete(req.params.columnId);
            res.json();
      } catch(err) {
            res.status(404).json({message: "Column not found"});
            throw new Error('Column not found');
      }
});


