import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC, Fragment, useContext } from "react";
import { BoardReducerContext } from "../../../api/Board/GetBoard";
import { getUserLanguage } from "../../../api/User/GetLoggedInUser";
import { AuthUserContext } from "../../../App";
import { ActionTypes } from "../../../reducers/BoardReducer";
import { INestedIssue, INestedMessage } from "../../../types/ModelTypes";


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		messageContainer: {
			marginBottom: theme.spacing(2),
			marginLeft: theme.spacing(2),
		},
		name: {
			fontWeight: 'bold',
			color: theme.palette.secondary.main,
		},
		date: {
			fontSize: '12px',
			color: theme.palette.secondary.main,
		},
		content: {
			marginBottom: theme.spacing(1),
			marginTop: theme.spacing(1),
			color: theme.palette.secondary.main,
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


interface MessagesTextProps {
	issue: INestedIssue,
	deleteMessage: () => void,
	displayOnly: boolean,
}


const IssueMessagesText: FC<MessagesTextProps> = (props) => {
	const classes = useStyles();
	const { dispatch } = useContext(BoardReducerContext);
	const { loggedInUser } = useContext(AuthUserContext);


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

		dispatch({ type: ActionTypes.UpdateIssue, payload: payload })
		props.deleteMessage();
	}


	function displayMessages() {
		if (props.issue.messages.length > 0) {
			return (props.issue.messages.map((message: INestedMessage) => {
				const msgTime = new Date(message.addTime);
				const formattedTime = msgTime.toLocaleDateString(getUserLanguage(), {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
				});

				const ownMessage = (message.sender._id === loggedInUser._id);
				const displayDelete = ownMessage && !props.displayOnly;


				return (
					<Fragment key={props.issue.messages.indexOf(message)}>
						<div className={classes.messageContainer}>
							<div>
								<span className={classes.name}>{message.sender.name}</span>
								<span className={classes.date}> at {formattedTime}</span>
							</div>
							<div className={classes.content}>
								{message.content}
							</div>
							{displayDelete &&
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


	return (
		<>
			{displayMessages()}
		</>
	);
}

export default IssueMessagesText;
