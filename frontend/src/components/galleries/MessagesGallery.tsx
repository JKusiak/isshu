import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC, Fragment, useContext } from "react";
import { INestedIssue, INestedMessage } from "../../types/ModelTypes";
import AddMessageButton from "../buttons/issueButtons/AddMessageButton";
import { BoardReducerContext } from "../functional/GetBoard";
import { getLoggedInUser, getUserLanguage } from "../functional/GetLoggedInUser";
import { ActionTypes } from "../reducers/BoardReducer";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            messagesTitle: {
                  fontWeight: 'bold',
                  fontSize: '16px',
                  marginBottom: theme.spacing(2),
            },
            messageContainer: {
                  marginBottom: theme.spacing(2),
                  marginLeft: theme.spacing(2),
            },
            name: {
                  fontWeight: 'bold',
            },
            date: {
                  fontSize: '12px',
            },
            content: {
                  marginBottom: theme.spacing(1),
                  marginTop: theme.spacing(1),
            },
            deleteButton: {
                  fontSize: '12px',
                  color: theme.palette.secondary.main,
                  "&:hover": {
                        cursor: 'pointer',
                        fontWeight: 'bold',
                  },
            }
      })
);


interface MessagesGalleryProps {
      issue: INestedIssue,
      addMessage: () => void,
      deleteMessage: () => void,
}


const MessagesGallery: FC<MessagesGalleryProps> = (props) => {
      const classes = useStyles();
      const { dispatch } = useContext(BoardReducerContext);
      const loggedInUser = getLoggedInUser();
      

      function handleSubmit(e: React.SyntheticEvent, messageContent: string) {
            e.preventDefault();
            
            if(messageContent !== '') {
                  const newMessage = {
                        content: messageContent,
                        sender: {
                              _id: loggedInUser._id,
                              name: loggedInUser.name,
                              surname: loggedInUser.surname,
                        },
                        addTime: Date.now(),
                  };
      
                  const updatedMessages = [...props.issue.messages, newMessage];
      
                  const payload = {
                        columnId: props.issue.columnId,
                        issueId: props.issue._id,
                        modified: {
                              messages: updatedMessages,
                        },
                  };
      
                  dispatch({type: ActionTypes.UpdateIssue, payload: payload});
                  props.addMessage();
            }
      }


      function handleDelete(e: React.SyntheticEvent, clickedMessage: INestedMessage) {
            const updatedMessages = props.issue.messages.filter(message => 
                  props.issue.messages.indexOf(message) !== props.issue.messages.indexOf(clickedMessage));

            const payload = {
                  columnId: props.issue.columnId,
                  issueId: props.issue._id,
                  modified: {
                        messages: updatedMessages,
                  },
            };

            dispatch({type: ActionTypes.UpdateIssue, payload: payload})
            props.deleteMessage();
      }


      function displayMessages() {
            if(props.issue.messages.length > 0) {
                  return(props.issue.messages.map((message: INestedMessage) => {
                        const msgTime = new Date(message.addTime);
                        const formattedTime = msgTime.toLocaleDateString(getUserLanguage(), {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                        });

                        const ownMessage = (message.sender._id === loggedInUser._id)? true : false;
                        
                        return(
                              <Fragment key={props.issue.messages.indexOf(message)}>
                                    <div className={classes.messageContainer}>
                                          <div>
                                                <span className={classes.name}>{message.sender.name}</span>
                                                <span className={classes.date}> at {formattedTime}</span>
                                          </div>
                                          <div  className={classes.content}>
                                                {message.content}
                                          </div>
                                          {ownMessage && 
                                                <div>
                                                      <span className={classes.deleteButton} onClick={(e) => handleDelete(e, message)}>Delete</span>
                                                </div>
                                          }
                                    </div>
                              </Fragment> 
                        );
                  }));
            }
      }


      return(
            <>
                  <div className={classes.messagesTitle}>Messages</div>
                  <AddMessageButton handleSubmit={handleSubmit}/>
                  {displayMessages()}
            </>
      );
}

export default MessagesGallery;
