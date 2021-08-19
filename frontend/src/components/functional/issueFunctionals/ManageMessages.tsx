import axios from 'axios';
import React, { FC } from 'react';
import { IMessage, INestedIssue } from '../../../types/ModelTypes';
import IssueMessagesGallery from '../../galleries/IssueMessagesGallery';


interface UpdateMessagesProps {
      issue: INestedIssue,
}


const UpdateMessages: FC<UpdateMessagesProps> = (props) => {


      function addMessage() {
            const adjustedMessages = props.issue.messages.map(message => {
                  const changedMessage: IMessage = {
                        ...message,
                        sender: message.sender._id,
                  }
                  
                  return changedMessage;
            });

            const requestBody = {
                  messages: adjustedMessages,
            }
            axios.post(`http://localhost:5000/issues/update/${props.issue._id}`, requestBody, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).catch((err) => {
                  console.log(err);
            })
      } 


      function deleteMessage() {
            const adjustedMessages = props.issue.messages.map(message => {
                  const changedMessage: IMessage = {
                        ...message,
                        sender: message.sender._id,
                  }
                  
                  return changedMessage;
            });

            const requestBody = {
                  messages: adjustedMessages,
            }

            axios.post(`http://localhost:5000/issues/update/${props.issue._id}`, requestBody, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).catch((err) => {
                  console.log(err);
            })
      } 


      return (
            <IssueMessagesGallery 
                  addMessage={addMessage}
                  deleteMessage={deleteMessage}
                  issue={props.issue}
            />
      );
}

export default UpdateMessages;