import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";
import BackIcon from '@material-ui/icons/ChevronLeftOutlined';
import Button from "@material-ui/core/Button";
import DeleteBoardModal from "./modals/DeleteBoardModal";


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
                  background: 'yellow',
                  width: 250,
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


interface IssueDataProps {
      issue: any,
      issueIndex: any,
}


const IssueData: FC<IssueDataProps> = (props) => {
      const classes = useStyles();

      function displayIssue() {
            return (
                  <Draggable
                        key={props.issueIndex}
                        draggableId={props.issue._id}
                        index={props.issueIndex}
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
                                          {props.issue.description}
                                    </div>
                              );
                        }}
                  </Draggable>
            );
                                               
      }




      return (
            <>
                  {displayIssue()}
            </>
      );
}

export default IssueData;