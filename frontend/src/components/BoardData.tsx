import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, Fragment } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useHistory, useParams } from "react-router-dom";
import BackIcon from '@material-ui/icons/ChevronLeftOutlined';
import Button from "@material-ui/core/Button";
import ColumnData from "./ColumnData";
import UpdateBoard from "./functional/UpdateBoard";
import AddColumn from "./functional/AddColumn";
import DeleteBoard from "./functional/DeleteBoard";
import { IBoard, IColumn, INestedBoard, INestedColumn } from "../types/ModelTypes";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            navigation: {
                  display: 'grid',
                  width: '100%',
                  gridTemplateColumns: '1fr 8fr 1fr',
                  margin: '1em 0 2em 0'
            },
            backButton: {
                  gridColumn: '1',
                  justifySelf: 'start',
                  alignSelf: 'center',
                  marginLeft: '1em',
                  color: theme.palette.secondary.dark,
                  textDecoration: 'none',
            },
            boardTitle: {
                  gridColumn: '2',
                  justifySelf: 'center',
                  alignSelf: 'center',
                  fontSize: '36px',
                  color: theme.palette.secondary.main,
      
            },
            deleteButton: {
                  gridColumn: '3',
                  justifySelf: 'end',
                  alignSelf: 'center',
                  marginRight: '1em'
            },
            backIcon: {
                  fontSize: '50px',
                  color: theme.palette.secondary.main
            },
            wrapper: {
                  display: 'flex',
                  justifyContent: 'center',
            },
            container: {
                  display: "flex", 
                  marginLeft: '3em',
            },
            addColumnButton: {
                  marginTop: '0.5em',
                  marginLeft: '1em',
            }  
      }
));


interface BoardDataProps {
      board: INestedBoard,
      changeColumn: (oldColumnId: string, newColumnId: string, issueId: string) => void,
}


const BoardData: FC<BoardDataProps> = (props) => {
      const classes = useStyles();
      const history = useHistory();
      const { projectId } = useParams<{projectId: string}>();


      function handleGoBack() {
            history.push(`/projects/${projectId}`);
      }


      const onDragEnd = (result: DropResult) => {
            const { source, destination, draggableId } = result;

            if (destination !== undefined && destination !== null && source.droppableId !== destination.droppableId) {
                  props.changeColumn(source.droppableId, destination.droppableId, draggableId);
            } else {
                  return;
            }
      };


      function displayBoardContent() {
            if(props.board.columns !== undefined && props.board.columns.length > 0) {
                  return(
                        <div className={classes.container}>
                              <DragDropContext onDragEnd={result => onDragEnd(result)}>           
                                    {props.board.columns.map((column: INestedColumn, index: number) => {
                                          return(
                                                <Fragment key={index}>
                                                      <ColumnData column={column}/> 
                                                </Fragment>
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
                        <Button className={classes.backButton} onClick={handleGoBack}>
                              <BackIcon className={classes.backIcon}/>
                        </Button>

                        <div className={classes.boardTitle}>
                              <UpdateBoard boardName={props.board.name}/>
                        </div>

                        <div className={classes.deleteButton}>
                              <DeleteBoard />
                        </div>          
                  </div>

                  <div className={classes.wrapper}>
                        {displayBoardContent()}
                        <div className={classes.addColumnButton}>
                              <AddColumn/>
                        </div>
                  </div>
            </>
      );
}

export default BoardData;