import { Card, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { IIssue } from "../types/ModelTypes";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            issueCard: {
                  height: 'auto',
                  minHeight: '70px',
                  maxHeight: '250px',
                  marginBottom: '1em',
                  boxShadow: theme.shadows[2],
                  "&:hover": {
                        cursor: 'pointer',
                        boxShadow: theme.shadows[5],
                  }
            },
            description: {
                  margin: '0.5em 0 0 0.5em',
                  fontSize: '15px',
            }
      }
));


interface IssueDataProps {
      issue: IIssue,
      index: number,
}


const IssueData: FC<IssueDataProps> = (props) => {
      const classes = useStyles();

      function displayIssue() {
            return (
                  <Draggable draggableId={props.issue._id} index={props.index}>
                        {(provided, snapshot) => {
                              return (
                                    <Card
                                          className={classes.issueCard}
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                                ...provided.draggableProps.style
                                          }}
                                    >
                                          <Typography className={classes.description} component='h6' variant='h6'>
                                                {props.issue.description}
                                          </Typography>
                                          
                                    </Card>
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