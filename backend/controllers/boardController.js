import Board from '../models/boardModel.js';
import asyncHandler from 'express-async-handler';


export const getAllBoards = asyncHandler(async(req, res) => {
      const boards = await Board.find({});
      
      res.json(boards);
  });
  
  
export const getBoardById = asyncHandler(async(req, res) => {
      const board = await Board.findById(req.params.id);
      
      if(board) {
            res.json(board);
      } else {
            res.status(404).json({message: "Board not found"});
            throw new Error('Board not found');
      }
});


export const addBoard = asyncHandler(async(req, res) => {
      const name = req.body.name;
      
      const newBoard = new Board ({
            name,
      });

      const savedBoard = await newBoard.save();

      if(savedBoard) {
            res.json('Board saved successfully');
      } else {
            res.status(400).json({message: "Can not save the board"});
            throw new Error('Can not save the board');
      }
});


export const updateBoard = asyncHandler(async(req, res) => {
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

      Board.findByIdAndUpdate(id, update, options, function(err, data) {
            if(err) {
                  res.status(400).json({message: "Update unsuccessful"});
                  throw new Error('Update unsuccessful');
            } else if(!data) {
                  res.status(404).json({message: "Board not found"});
                  throw new Error('Board not found');
            } else {
                  res.json("Board updated successfuly");
            }
      });
});


export const deleteBoard = asyncHandler(async(req, res) => {
      const board = await Board.findByIdAndDelete(req.params.id);

      if(board) {
            res.json("Board deleted successfuly");
      } else {
            res.status(404).json({message: "Board not found"});
            throw new Error('Board not found');
      }
});


export const getColumnsOfBoard = asyncHandler(async(req, res) => {
      const columns = await Board.findOne({_id: req.params.id})
            .populate('columns');

      if(columns) {
            res.json(columns);
      } else {
            res.status(404).json({message: "Board not found"});
            throw new Error('Board not found');
      }
});


export const addColumnToBoard = asyncHandler(async(req, res) => {
      const id = req.params.id;
      const update = {
          $push: {
              columns: req.body.columnId,
          } 
      };
      const options = {
          new: true, 
          useFindAndModify: false,
      };
  
  
      // no await here, otherwise callback on update + await make execute twice
      Board.findByIdAndUpdate(id, update, options, function(err, data){
          if(err) {
              res.status(400).json({message: "Update unsuccessful"});
              throw new Error('Update unsuccessful');
          } else if(!data) {
              res.status(404).json({message: "Board not found"});
              throw new Error('Board not found');
          } else {
              res.json("Board's columns updated successfuly");
          }
      });
});


export const deleteColumnFromBoard = asyncHandler(async(req, res) => {
      const id = req.params.id;
      const update = {
            $pullAll: {
                  columns: [req.body.columnId],
            } 
      };
      const options =  {
          safe: true, 
          upsert: true
      };
  
      Board.findByIdAndUpdate(id, update, options, function(err, data){
          if(err) {
              res.status(400).json({message: "Update unsuccessful"});
              throw new Error('Update unsuccessful');
          } else if(!data) {
              res.status(404).json({message: "Board not found"});
              throw new Error('Board not found');
          } else {
              res.json("Board updated successfuly");
          }
      });
  });