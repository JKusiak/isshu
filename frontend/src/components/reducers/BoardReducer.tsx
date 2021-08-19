import { INestedBoard } from "../../types/ModelTypes";

// helper function for ensuring the find function result never equals undefined
export function ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there.'): T {
      if (argument === undefined || argument === null) {
            throw new TypeError(message);
      }
    
      return argument;
}

export enum ActionTypes {
      FetchData = 'FETCH DATA',
      UpdateBoard = 'UPDATE BOARD',
      AddColumn = 'ADD COLUMN',
      DeleteColumn = 'DELETE COLUMN',
      UpdateColumn = 'UPDATE COLUMN',
      AddIssue = 'ADD ISSUE',
      ArchivizeIssue = 'ARCHIVIZE ISSUE',
      UpdateIssue = 'UPDATE ISSUE',
      ChangeColumns = 'REMOVE FROM COLUMN',
      ReorderColumn = 'REORDER COLUMN'
}
    
export type Action = {
      type: ActionTypes,
      payload: any,
}

export const boardContentReducer = (state: INestedBoard, action: Action) => {
      const {type, payload} = action;

      switch (type) {
            case ActionTypes.FetchData:
                  return payload
                  
            case ActionTypes.UpdateBoard:
                  return {
                        ...state,
                        name: payload,
                  }
            case ActionTypes.AddColumn:
                  return { 
                        ...state, 
                        columns: [...state.columns, payload],
                  }     
            case ActionTypes.DeleteColumn:
                  return { 
                        ...state, 
                        columns: state.columns.filter(column => column._id !== payload), 
                  }
            case ActionTypes.UpdateColumn:
                  return { 
                        ...state, 
                        columns: state.columns.map(column => {
                              if(column._id === payload.columnId) {
                                    column.name = payload.newName
                              }
                              return column;
                        }) 
                  }
            case ActionTypes.AddIssue:
                  return { 
                        ...state, 
                        columns: state.columns.map(column => {
                              if(column._id === payload.columnId) {
                                    column.issues.push(payload)
                              }
                              return column;
                        })
                  }
            case ActionTypes.ArchivizeIssue:
                  return { 
                        ...state, 
                        columns: state.columns.map(column => {
                              if(column._id === payload.columnId) {
                                    const newIssues = column.issues.filter(issue => issue._id !== payload.issueId);
                                    return {
                                          ...column,
                                          issues: newIssues,
                                    }
                              }
                              return column;
                        })
                  }
            case ActionTypes.UpdateIssue:
                  return { 
                        ...state, 
                        columns: state.columns.map(column => {
                              if(column._id === payload.columnId) {
                                    column.issues.map(issue => {
                                          if(issue._id === payload.issueId) {
                                                if(payload.modified.name) issue.name = payload.modified.name;
                                                if(payload.modified.description) issue.description = payload.modified.description;
                                                if(payload.modified.columnId) issue.columnId = payload.modified.columnId;
                                                if(payload.modified.steps) issue.steps = payload.modified.steps;
                                                if(payload.modified.messages) issue.messages = payload.modified.messages;
                                                if(payload.modified.tags) issue.tags = payload.modified.tags;
                                                if(payload.modified.contributors) issue.contributors = payload.modified.contributors;
                                                if(typeof payload.modified.isFinished !== 'undefined') issue.isFinished = payload.modified.isFinished;
                                          }
                                          return issue;
                                    })
                              }
                              return column;
                        })  
                  }
            case ActionTypes.ChangeColumns:
                  const issueColumn = ensure(state.columns.find(column => column._id === payload.oldColumnId));
                  const movedIssue = ensure(issueColumn.issues.find(issue => issue._id === payload.issueId));
                  movedIssue.columnId = payload.newColumnId;

                  return { 
                        ...state, 
                        columns: state.columns.map(column => {
                              if(column._id === payload.oldColumnId) {
                                    const newIssues = column.issues.filter(issue => issue._id !== payload.issueId);
                                    return {
                                          ...column,
                                          issues: newIssues,
                                    }
                              } else if(column._id === payload.newColumnId) {
                                    if(movedIssue !== undefined) {
                                          column.issues.push(movedIssue)
                                    }
                              }
                              return column;
                        })  
                  }
            case ActionTypes.ReorderColumn:
                  return { 
                        ...state, 
                        columns: state.columns.map(column => {
                              if(column._id === payload.columnId) {
                                    return {
                                          ...column,
                                          issues: payload.reorderedIssues
                                    }
                              }
                              return column;
                        })
                  }
            default:
                  return state
      }
}