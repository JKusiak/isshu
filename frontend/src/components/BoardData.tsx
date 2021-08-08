import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, Fragment } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Link, useHistory, useParams } from "react-router-dom";
import BackIcon from '@material-ui/icons/ChevronLeftOutlined';
import Button from "@material-ui/core/Button";
import DeleteBoardModal from "./modals/DeleteBoardModal";
import ColumnData from "./ColumnData";
import { INestedBoard, INestedColumn } from "../types/ModelTypes";
import UpdateBoard from "./functional/UpdateBoard";
import AddColumn from "./functional/AddColumn";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            navigation: {
                  display: 'grid',
                  width: '100%',
                  gridTemplateColumns: '1fr 8fr 1fr',
                  margin: '1em 0 2em 0'
            },
            backButton: {
                  justifySelf: 'start',
                  alignSelf: 'center',
                  marginLeft: '1em',
                  color: theme.palette.secondary.dark,
                  textDecoration: 'none',
            },
            deleteButton: {
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
      fetchBoard: () => void, 
      swapColumns: (arg0: string, arg1: string, arg2: string) => void,
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

            if (destination !== undefined && destination !== null) {
                  if(source.droppableId !== destination.droppableId) {
                        props.swapColumns(source.droppableId, destination.droppableId, draggableId);
                  } else {
                        return;
                  }
            } else {
                  return;
            }
      };


      function displayBoard() {
            if(props.board.columns !== undefined && props.board.columns.length > 0) {
                  return(
                        <div className={classes.container}>
                              <DragDropContext onDragEnd={result => onDragEnd(result)}>           
                                    {props.board.columns.map((column: INestedColumn, index: number) => {
                                          return(
                                                <Fragment key={index}>
                                                      <ColumnData column={column} fetchBoard={props.fetchBoard}/> 
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

                        <UpdateBoard boardName={props.board.name} fetchBoard={props.fetchBoard}/>

                        <div className={classes.deleteButton}>
                              <DeleteBoardModal />
                        </div>          
                  </div>

                  <div className={classes.wrapper}>
                        {displayBoard()}
                        <div className={classes.addColumnButton}>
                              <AddColumn fetchBoard={props.fetchBoard}/>
                        </div>
                  </div>
            </>
      );
}

export default BoardData;