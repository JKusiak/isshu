import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";
import BackIcon from '@material-ui/icons/ChevronLeftOutlined';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/ClearOutlined';
import DeleteBoardModal from "./modals/DeleteBoardModal";


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
            },
            navigation: {
                  display: 'grid',
                  width: '100%',
                  gridTemplateColumns: '1fr 1fr',
                  margin: '1em 0 2em 0'
            },
            backButton: {
                  justifySelf: 'start',
                  marginLeft: '1em'
            },
            deleteModal: {
                  justifySelf: 'end',
                  marginRight: '1em'
            },
            backIcon: {
                  fontSize: '50px',
                  color: theme.palette.secondary.main
            },            
      }
));


interface BoardDataProps {
      board: any,
}


const BoardData: FC<BoardDataProps> = (props) => {
      const classes = useStyles();
      const [columns, setColumns] = useState(props.board);
      let history = useHistory();

      function getPreviousPath() {
            history.goBack();
      }


      const onDragEnd = (result: any, columns: { [x: string]: any; }, setColumns: (arg0: any) => void) => {
            if (!result.destination) return;
            const { source, destination } = result;

            if (source.droppableId !== destination.droppableId) {
                  const sourceColumn = columns[source.droppableId];
                  const destColumn = columns[destination.droppableId];
                  const sourceIssues = [...sourceColumn.issues];
                  const destIssues = [...destColumn.issues];
                  const [removed] = sourceIssues.splice(source.index, 1);

                  destIssues.splice(destination.index, 0, removed);
                  
                  setColumns({
                        ...columns,
                        [source.droppableId]: {
                              ...sourceColumn,
                              items: sourceIssues
                        },
                        [destination.droppableId]: {
                              ...destColumn,
                              items: sourceIssues
                        }
                  });
            } else {
                  const column = columns[source.droppableId];
                  const copiedIssues = [...column.issues];
                  const [removed] = copiedIssues.splice(source.index, 1);

                  copiedIssues.splice(destination.index, 0, removed);

                  setColumns({
                        ...columns,
                        [source.droppableId]: {
                              ...column,
                              items: copiedIssues
                        }
                  });
            }
      };


      function displayColumns() {
            if(props.board.length > 0) {
                  return(
                        <div className={classes.root}>
                        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                                    {props.board.map((column: any, index: any) => {
                                          return(
                                                <div className={classes.boardWrapper} key={column._id}>
                                                      <h2>{column.name}</h2>
                                                      <div style={{ margin: 8 }}>
                                                            <Droppable
                                                                  key={column._id}
                                                                  droppableId={column._id} 
                                                            >
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
                                    })}
                        </DragDropContext>
                  </div> 
                  );
                  
            }
      }

      return (
            <>
                  <div className={classes.navigation}>
                        <Button className={classes.backButton} onClick={getPreviousPath}>
                              <BackIcon className={classes.backIcon}/>
                        </Button>
                        <div className={classes.deleteModal}>
                              <DeleteBoardModal />
                        </div>
                        
                  </div>
                  
                  {displayColumns()}
            </>
      );
}

export default BoardData;