import axios from 'axios';
import { FC } from 'react';
import IssueMessagesGallery from '../../../components/Issue/Message/IssueMessagesGallery';
import { IMessage, INestedIssue } from '../../../types/ModelTypes';


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
		axios.post(`/issues/update/${props.issue._id}`, requestBody)
			.catch((err) => {
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

		axios.post(`/issues/update/${props.issue._id}`, requestBody)
			.catch((err) => {
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