import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, Fragment, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import IssueData from "./IssueData";
import { INestedColumn, INestedIssue } from "../types/ModelTypes";
import AddIssue from "./functional/AddIssue";
import DeleteColumn from "./functional/DeleteColumn";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            columnWrapper: {
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 500,
                  alignItems: "center",
                  "&:not(:last-child)": {
                        borderRight: '0.1px solid',
                        borderRightColor: theme.palette.primary.dark,
                  },
            },
            columnHeader: {
                  display: 'grid',
                  gridTemplateColumns: '0.5fr 1fr 0.5fr',
                  minWidth: '100%',
                  paddingBottom: '0.5em',
                  borderBottom: '0.1px solid',
                  borderBottomColor: theme.palette.primary.dark,
            },
            columnName: {
                  gridColumn: '2',
                  justifySelf: 'center',
                  fontSize: '20px',
                  fontWeight: 400,
                  color: theme.palette.secondary.light,    
            },
            deleteColumnButton: {
                  gridColumn: '3',
                  justifySelf: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
            },
            columnContentWrapper: {
                  width: '275px',
                  minHeight: '50vh',
                  height: 'auto',
                  margin: '15px',
                  backgroundColor: theme.palette.primary.main,
            },
      }
));


interface ColumnDataProps {
      column: INestedColumn,
      fetchBoard: () => void,
}


const ColumnData: FC<ColumnDataProps> = (props) => {
      const classes = useStyles();
      const [showDeleteColumn, setShowDeleteColumn] = useState<boolean>(false);
      const [showAddIssue, setShowAddIssue] = useState<boolean>(false);


      function displayColumn() {
            return(
                  <div className={classes.columnWrapper}>
                        <div 
                              className={classes.columnHeader} 
                              onMouseOver={() => setShowDeleteColumn(true)} 
                              onMouseLeave={() => setShowDeleteColumn(false)}        
                        >
                              <h2 className={classes.columnName}>{props.column.name}</h2>
                              
                              {showDeleteColumn &&
                                    <div className={classes.deleteColumnButton}>
                                          <DeleteColumn column={props.column} fetchBoard={props.fetchBoard}/>
                                    </div>
                              }
                        </div>
                              
                        <Droppable droppableId={props.column._id}>
                              {provided => {
                                    return (
                                          <div 
                                                className={classes.columnContentWrapper}
                                                onMouseOver={() => setShowAddIssue(true)} 
                                                onMouseLeave={() => setShowAddIssue(false)}        
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                          >
                                                <div>
                                                      {props.column.issues.map((issue: INestedIssue, index: number) => {
                                                            return (
                                                                  <Fragment key={index}>
                                                                        <IssueData issue={issue} index={index}/>
                                                                  </Fragment>
                                                            );
                                                      })}
                                                      {provided.placeholder}
                                                      {showAddIssue &&
                                                            <AddIssue column={props.column} fetchBoard={props.fetchBoard}/>
                                                      }
                                                </div>
                                          </div>
                                    );
                              }}
                        </Droppable>

                        
                  </div>          
            )                           
      }


      return (
            <>
                  {displayColumn()}
            </>
      );
}

export default ColumnData;