import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";
import BackIcon from '@material-ui/icons/ChevronLeftOutlined';
import Button from "@material-ui/core/Button";
import DeleteBoardModal from "./modals/DeleteBoardModal";
import IssueData from "./IssueData";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            columnWrapper: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  "&:not(:last-child)": {
                        borderRight: '0.1px solid',
                        borderRightColor: theme.palette.primary.dark,
                  },
            },
            columnName: {
                  width: '100%',
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: 400,
                  color: theme.palette.secondary.light,
                  paddingBottom: '0.5em',
                  borderBottom: '0.1px solid',
                  borderBottomColor: theme.palette.primary.dark,
            },
            columnContentWrapper: {
                  margin: 8,
                  background: theme.palette.primary.main,
                  width: 300,
                  minHeight: 500
            },
            issueWrapper: {
                  userSelect: "none",
                  padding: 16,
                  margin: "0 0 8px 0",
                  minHeight: "50px",
            }, 
      }
));


interface ColumnDataProps {
      column: any,
      columnIndex: any,
}


const ColumnData: FC<ColumnDataProps> = (props) => {
      const classes = useStyles();

      function displayColumn() {
            return(
                  <div className={classes.columnWrapper} key={props.columnIndex}>
                        <h2 className={classes.columnName}>{props.column.name}</h2>
                        <Droppable
                              key={props.columnIndex}
                              droppableId={props.column._id}
                        >
                              {(provided, snapshot) => {
                                    return (
                                          <div className={classes.columnContentWrapper}
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                          >
                                                {props.column.issues.map((issue: any, index: any) => {
                                                      return (
                                                            <IssueData issue={issue} issueIndex={index}/>
                                                            
                                                      );
                                                })}
                                                {provided.placeholder}
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