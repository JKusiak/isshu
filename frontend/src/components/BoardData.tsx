import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, Fragment } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";
import BackIcon from '@material-ui/icons/ChevronLeftOutlined';
import Button from "@material-ui/core/Button";
import DeleteBoardModal from "./modals/DeleteBoardModal";
import ColumnData from "./ColumnData";
import AddColumnModal from "./modals/AddColumnModal";
import DeleteColumnForm from "./functional/DeleteColumnForm";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            backButton: {
                  justifySelf: 'start',
                  alignSelf: 'center',
                  marginLeft: '1em',
            },
            boardTitle: {
                  justifySelf: 'center',
                  alignSelf: 'center',
                  fontSize: '36px',
                  color: theme.palette.secondary.main,
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
            },
            container: {
                  display: "flex", 
                  
                  marginLeft: '3em',
            },
            navigation: {
                  display: 'grid',
                  width: '100%',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  margin: '1em 0 2em 0'
            },
            addColumnButton: {
                  marginTop: '0.5em',
                  marginLeft: '1em',
            }  
      }
));


interface BoardDataProps {
      board: any,
      fetchBoard: any,
      addToColumn: any,
      deleteFromColumn: any,
}


const BoardData: FC<BoardDataProps> = (props) => {
      const classes = useStyles();
      let history = useHistory();


      function getPreviousPath() {
            history.goBack();
      }


      const onDragEnd = (result: any) => {
            const { source, destination, draggableId } = result;

            if (!result.destination || source.droppableId === destination.droppableId) {
                  return;
            } else {
                  props.deleteFromColumn(source.droppableId, draggableId);
                  props.addToColumn(destination.droppableId, draggableId);
            }
      };


      function displayBoard() {
            if(props.board.columns !== undefined && props.board.columns.length > 0) {
                  return(
                  <div className={classes.wrapper}>
                        <div className={classes.container}>
                              <DragDropContext onDragEnd={result => onDragEnd(result)}>           
                                    {props.board.columns.map((column: any, index: any) => {
                                          return(
                                                <Fragment key={index}>
                                                      <ColumnData column={column} fetchBoard={props.fetchBoard}/> 
                                                </Fragment>
                                          );
                                    })}       
                              </DragDropContext>
                        </div>
                        
                        <div className={classes.addColumnButton}>
                              <AddColumnModal fetchBoard={props.fetchBoard}/>
                        </div>
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
                        <div className={classes.boardTitle}>
                              {props.board.name}
                        </div>
                        <div className={classes.deleteButton}>
                              <DeleteBoardModal />
                        </div>          
                  </div>
                  
                  {displayBoard()}
            </>
      );
}

export default BoardData;