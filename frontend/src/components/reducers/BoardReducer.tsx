import { INestedBoard } from "../../types/ModelTypes";

export enum ActionTypes {
      FetchData = 'FETCH DATA',
      UpdateBoard = 'UPDATE BOARD',
      AddColumn = 'ADD COLUMN',
      DeleteColumn = 'DELETE COLUMN',
      UpdateColumn = 'UPDATE COLUMN',
      AddIssue = 'ADD ISSUE',
      DeleteIssue = 'DELETE ISSUE',
      UpdateIssue = 'UPDATE ISSUE',
      ChangeColumns = 'REMOVE FROM COLUMN',
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
            case ActionTypes.DeleteIssue:
                  return { 
                        ...state, 
                        columns: state.columns.map(column => {
                              if(column._id === payload.columnId) {
                                    column.issues.filter(issue => issue._id !== payload.issueId)
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
                                          }
                                          return issue;
                                    })
                              }
                              return column;
                        })  
                  }
            case ActionTypes.ChangeColumns:
                  return { 
                        ...state, 
                        columns: state.columns.map(column => {
                              if(column._id === payload.oldColumnId) {
                                    const newIssues = column.issues.filter(issue => issue._id !== payload.issueContent._id);
                                    return {
                                          ...column,
                                          issues: newIssues,
                                    }
                              } else if(column._id === payload.newColumnId) {
                                    column.issues.push(payload.issueContent)
                              }

                              return column;
                        })  
                  }
            default:
                  return state
      }
    }