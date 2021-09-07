import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC, useContext } from "react";
import { BoardReducerContext } from "../../../api/Board/GetBoard";
import { AuthUserContext } from "../../../App";
import { ActionTypes } from "../../../reducers/BoardReducer";
import { INestedIssue } from "../../../types/ModelTypes";
import AddMessageButton from "./AddMessageButton";
import IssueMessagesText from "./IssueMessagesText";


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		messagesTitle: {
			fontWeight: 'bold',
			fontSize: '16px',
			color: theme.palette.secondary.main,
			marginBottom: theme.spacing(2),
		},
	})
);


interface IssueMessagesGalleryProps {
	issue: INestedIssue,
	addMessage: () => void,
	deleteMessage: () => void,
}


const IssueMessagesGallery: FC<IssueMessagesGalleryProps> = (props) => {
	const classes = useStyles();
	const { dispatch } = useContext(BoardReducerContext);
	const { loggedInUser } = useContext(AuthUserContext);


	function handleSubmit(e: React.SyntheticEvent, messageContent: string) {
		e.preventDefault();

		if (messageContent !== '') {
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

			dispatch({ type: ActionTypes.UpdateIssue, payload: payload });
			props.addMessage();
		}
	}


	


	return (
		<>
			<div className={classes.messagesTitle}>Messages</div>
			<AddMessageButton handleSubmit={handleSubmit} />
			<IssueMessagesText 
					issue={props.issue}
					deleteMessage={props.deleteMessage}
					displayOnly={false}
			/>
		</>
	);
}

export default IssueMessagesGallery;
