import { Card, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { INestedIssue } from "../types/ModelTypes";
import IssueContentModal from "./modals/IssueContentModal";


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
      issue: INestedIssue,
      index: number,
}


const IssueData: FC<IssueDataProps> = (props) => {
      const classes = useStyles();
      const [isModalOpen, setIsModalOpen] = useState(false);


      return (
            <>
                  <Draggable draggableId={props.issue._id} index={props.index}>
                        {(provided) => {
                              return (
                                    <>
                                          <Card
                                                className={classes.issueCard}
                                                onClick={() => setIsModalOpen(true)}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                      ...provided.draggableProps.style
                                                }}
                                          >
                                                <Typography className={classes.description} component='h6' variant='h6'>
                                                      {props.issue.name}
                                                </Typography>
                                          </Card>

                                          <IssueContentModal 
                                                issue={props.issue} 
                                                isIssueModalOpen={isModalOpen} 
                                                setIssueModalOpen={setIsModalOpen}
                                          />
                                    </>
                              );
                        }}
                  </Draggable>
            </>
      );
}

export default IssueData;