import Board from '../models/boardModel.js';
import asyncHandler from 'express-async-handler';


export const getAllBoards = asyncHandler(async(req, res) => {
      try {
            const boards = await Board.find({});
            res.json(boards);
      } catch(err) {
            res.status(500).json({message: "Server error on fetching boards"});
            throw new Error('Server error on fetching boards');
      }
  });
  
  
export const getBoardById = asyncHandler(async(req, res) => {
      try {
            const board = await Board.findById(req.params.id);
            res.json(board);
      } catch(err) {
            res.status(404).json({message: "Board not found"});
            throw new Error('Board not found');
      }
});


export const addBoard = asyncHandler(async(req, res) => {
      const name = req.body.boardName;

      const newBoard = new Board ({
            name,
      });

      try {
            const savedBoard = await newBoard.save();
            res.json(savedBoard);
      } catch(err) {
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

      try {
            await Board.findByIdAndUpdate(id, update, options);
      } catch(err) {
            res.status(400).json({message: "Update of board unsuccessful"});
            throw new Error('Update of board unsuccessful');
      }
});


export const deleteBoard = asyncHandler(async(req, res) => {
      try {
            const board = await Board.findByIdAndDelete(req.params.id);
      } catch(err) {
            res.status(404).json({message: "Board not found"});
            throw new Error('Board not found');
      }
});


export const getAllBoardContent = asyncHandler(async(req, res) => {
      try {
            const content = await Board.findOne({_id: req.params.id})
                  .populate({ 
                        path: 'columns',
                        populate: {
                              path: 'issues',
                              model: 'Issue',
                              populate: {
                                    path: 'tags',
                                    model: 'Tag',
                              }
                        } 
                  });
            res.json(content);
      } catch(err) {
            res.status(404).json({message: "Board's content not found"});
            throw new Error("Board's content not found");
      }
});


export const addColumnToBoard = asyncHandler(async(req, res) => {
      const id = req.params.id;
      const columnId = req.body.columnId;

      const update = {
          $push: {
              columns: columnId,
          } 
      };
      
      const options = {
          new: true, 
          useFindAndModify: false,
      };
  
      try {
            await Board.findByIdAndUpdate(id, update, options);
            res.json("Column added to board successfuly");
      } catch(err) {
            res.status(400).json({message: "Could not add column to board"});
            throw new Error('Could not add column to board');
      }
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
  
      try {
            await Board.findByIdAndUpdate(id, update, options);
      } catch(err) {
            res.status(400).json({message: "Could not delete column from board"});
            throw new Error('Could not delete column from board');
      }
  });