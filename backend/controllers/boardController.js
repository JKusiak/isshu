import Board from '../models/boardModel.js';
import Column from '../models/columnModel.js';
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


export const getColumnsOfBoard = asyncHandler(async(req, res) => {
      const boardId = req.params.boardId;
  
      try {
          const columns = await Column.find({boardId: boardId})
          res.json(columns);
      } catch(err) {
          res.status(404).json({message: "Project not found"});
          throw new Error('Project not found');
      }
});


export const getNestedBoard = asyncHandler(async(req, res) => {
      const boardId = req.params.boardId;
      
      try {
            const board = await Board.findById(boardId).populate({ 
                  path: 'columns',
                  model: 'Column',
                  populate: {
                        path: 'issues',
                        model: 'Issue',
                        populate: [{
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
                        }]       
                  } 
            });
            res.json(board);
      } catch(err) {
            res.status(404).json({message: "Board's content not found"});
            throw new Error("Board's content not found");
      }
});


export const addBoard = asyncHandler(async(req, res) => {
      const name = req.body.boardName;
      const projectId = req.body.projectId;

      const newBoard = new Board ({
            name,
            projectId,
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

            if(board) {
                  return res.status(204);
            }
            res.status(404).json({message: "Board not found"});
      } catch(err) {
            next(err);
      }
});
