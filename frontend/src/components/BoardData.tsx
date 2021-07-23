import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, Fragment, useEffect, useState } from "react";
import BackIcon from '@material-ui/icons/ChevronLeftOutlined';
import Button from "@material-ui/core/Button";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            root: {
                  display: "flex", justifyContent: "center", height: "100%" 
            },
            boardWrapper: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
            },
            columnWrapper: {
                  padding: 4,
                  width: 250,
                  minHeight: 500
            },
            issueWrapper: {
                  userSelect: "none",
                  padding: 16,
                  margin: "0 0 8px 0",
                  minHeight: "50px",
                  color: "white",
            }
      }
));


interface BoardDataProps {
      board: any,
}


const BoardData: FC<BoardDataProps> = (props) => {
      const classes = useStyles();
      let history = useHistory();

      function getPreviousPath() {
            history.goBack();
      }

      function displayColumns() {
            if(props.board.length > 0) {
                  return(
                        <div className={classes.root}>
                        <DragDropContext onDragEnd={() => console.log('dropped')}>
                                    {props.board.map((column: any) => {
                                          return(
                                                <div className={classes.boardWrapper} key={column._id}>
                                                      <h2>{column.name}</h2>
                                                      <div style={{ margin: 8 }}>
                                                            <Droppable droppableId={column._id} key={column._id}>
                                                                  {(provided, snapshot) => {
                                                                        return (
                                                                              <div
                                                                                    className={classes.columnWrapper}
                                                                                    {...provided.droppableProps}
                                                                                    ref={provided.innerRef}
                                                                              >
                                                                                    {column.issues.map((issue: any, index: any) => {
                                                                                          return (
                                                                                                <Draggable
                                                                                                      key={issue._id}
                                                                                                      draggableId={issue._id}
                                                                                                      index={index}
                                                                                                >
                                                                                                      {(provided, snapshot) => {
                                                                                                            return (
                                                                                                                  <div
                                                                                                                        ref={provided.innerRef}
                                                                                                                        {...provided.draggableProps}
                                                                                                                        {...provided.dragHandleProps}
                                                                                                                        style={{
                                                                                                                              backgroundColor: snapshot.isDragging
                                                                                                                              ? "#263B4A"
                                                                                                                              : "#456C86",
                                                                                                                              ...provided.draggableProps.style
                                                                                                                        }}
                                                                                                                  >
                                                                                                                        {issue.description}
                                                                                                                  </div>
                                                                                                            );
                                                                                                      }}
                                                                                                </Draggable>
                                                                                          );
                                                                                    })}
                                                                                    {provided.placeholder}
                                                                              </div>
                                                                        );
                                                                  }}
                                                            </Droppable>
                                                      </div>
                                                </div>          
                                          );
                                    })};
                        </DragDropContext>
                  </div> 
                  );
                  
            }
      }

      return (
            <Fragment>
                  <Button onClick={getPreviousPath}>
                        <BackIcon/>
                  </Button>
                  {displayColumns()}
            </Fragment>
      );
}

export default BoardData;