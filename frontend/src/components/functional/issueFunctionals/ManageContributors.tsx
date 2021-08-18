import React, { FC } from 'react';
import { INestedIssue } from '../../../types/ModelTypes';
import ContributorsGallery from '../../galleries/IssueContributorsGallery';


interface ManageContributorsProps {
      issue: INestedIssue,
}


const ManageContributors: FC<ManageContributorsProps> = (props) => {


      function addMessage() {
            // const adjustedMessages = props.issue.messages.map(message => {
            //       const changedMessage: IMessage = {
            //             ...message,
            //             sender: message.sender._id,
            //       }
                  
            //       return changedMessage;
            // });

            // const requestBody = {
            //       messages: adjustedMessages,
            // }
            // axios.post(`http://localhost:5000/issues/update/${props.issue._id}`, requestBody, {
            //       headers: {
            //             'Authorization': `Bearer ${localStorage.getItem('token')}`
            //       }
            // }).catch((err) => {
            //       console.log(err);
            // })
      } 


      function deleteMessage() {
            // const adjustedMessages = props.issue.messages.map(message => {
            //       const changedMessage: IMessage = {
            //             ...message,
            //             sender: message.sender._id,
            //       }
                  
            //       return changedMessage;
            // });

            // const requestBody = {
            //       messages: adjustedMessages,
            // }

            // axios.post(`http://localhost:5000/issues/update/${props.issue._id}`, requestBody, {
            //       headers: {
            //             'Authorization': `Bearer ${localStorage.getItem('token')}`
            //       }
            // }).catch((err) => {
            //       console.log(err);
            // })
      } 


      return (
		<ContributorsGallery 
			
		/>
      );
}

export default ManageContributors;