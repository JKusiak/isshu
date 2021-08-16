import { Button, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/DeleteOutlineOutlined';
import React, { FC, Fragment, useContext, useState } from "react";
import { INestedIssue, INestedMessage } from "../../types/ModelTypes";
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
            formContainer: {
                  width: '100%',
                  height: '3vh',
                  minHeight: '30px',
                  marginBottom: theme.spacing(2),
            },
            inputField: {
                  width: '100%',
                  height: '100%',
                  "& .MuiOutlinedInput-root": {
                        height: '100%',
                        "& fieldset": {
                              height: 'auto',
                              borderColor: '#cfd2d4',
                              borderRadius: '10px',
                              borderWidth: "1px",
                        },
                        "&.Mui-focused fieldset": {
                              height: 'auto',
                              borderColor: theme.palette.secondary.light,
                              borderRadius: '10px',
                              borderWidth: "1px",
                        },
                        alignItems: 'start',
                  },
            },
            deleteButton: {
                  maxWidth: '30px',
                  maxHeight: '30px',
                  minWidth: '30px',
                  minHeight: '30px',
                  
            },
            deleteIcon: {
            color: theme.palette.secondary.main,
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
      const [messageContent, setMessageContent] = useState('');
      const loggedInUser = getLoggedInUser();
      

      function handleSubmit(e: React.SyntheticEvent) {
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
      
                  const updatedMessages = [...props.issue.messages, newMessage]
      
                  const payload = {
                        columnId: props.issue.columnId,
                        issueId: props.issue._id,
                        modified: {
                              messages: updatedMessages,
                        },
                  };
      
                  dispatch({type: ActionTypes.UpdateIssue, payload: payload});
                  setMessageContent('');
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
                                    <div>
                                          {message.content}
                                          {message.sender.name}
                                          {formattedTime}
                                          {ownMessage && 
                                                <Button className={classes.deleteButton} onClick={(e) => handleDelete(e, message)}>
                                                      <DeleteIcon className={classes.deleteIcon}/>
                                                </Button>
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
                  <form className={classes.formContainer} onSubmit={handleSubmit} autoComplete="off">
                        <TextField
                              className={classes.inputField}
                              required
                              autoFocus
                              size="small"
                              variant='outlined'
                              name="newComment"
                              id="newComment"
                              placeholder="Add message..."
                              value={messageContent}
                              autoComplete="new-comment"
                              inputProps={{style: {fontSize: 15, padding:5}}}
                              onChange={e => {
                                    setMessageContent(e.target.value);
                              }}                  
                        />
                  </form>     
                  {displayMessages()}
            </>
      );
}

export default MessagesGallery;
