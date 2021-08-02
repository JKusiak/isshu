import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
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