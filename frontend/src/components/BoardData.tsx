import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";
import BackIcon from '@material-ui/icons/ChevronLeftOutlined';
import Button from "@material-ui/core/Button";
import DeleteBoardModal from "./modals/DeleteBoardModal";
import ColumnData from "./ColumnData";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            container: {
                  display: "flex", justifyContent: "center", height: "100%" 
            },
            navigation: {
                  display: 'grid',
                  width: '100%',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  margin: '1em 0 2em 0'
            },
            backButton: {
                  justifySelf: 'start',
                  alignSelf: 'center',
                  marginLeft: '1em'
            },
            boardTitle: {
                  justifySelf: 'center',
                  alignSelf: 'center',
                  fontSize: '36px',
                  color: theme.palette.secondary.main,
            },
            deleteModal: {
                  justifySelf: 'end',
                  alignSelf: 'center',
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

            if (!result.destination) {
                  return;
            }

            if (source.droppableId !== destination.droppableId) {
                  props.deleteFromColumn(source.droppableId, draggableId);
                  props.addToColumn(destination.droppableId, draggableId);
            } else {
                  return;
            }
      };


      function displayBoard() {
            if(props.board.columns !== undefined && props.board.columns.length > 0) {
                  return(
                        <div className={classes.container}>
                        <DragDropContext onDragEnd={result => onDragEnd(result)}>
                                    {props.board.columns.map((column: any, index: any) => {
                                          return(
                                                <ColumnData column={column} columnIndex={index}/>
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
                        <div className={classes.boardTitle}>
                              {props.board.name}
                        </div>
                        <div className={classes.deleteModal}>
                              <DeleteBoardModal />
                        </div>
                        
                  </div>
                  
                  {displayBoard()}
            </>
      );
}

export default BoardData;