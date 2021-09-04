import { TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC, useState } from "react";


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formContainer: {
			flexShrink: 0,
			width: '100%',
			height: 'auto',
			marginBottom: theme.spacing(2),
		},
		inputField: {
			width: '100%',
			height: 'auto',

			"& .MuiOutlinedInput-root": {
				color: theme.palette.secondary.main,
				height: 'auto',
				"& .MuiOutlinedInput-notchedOutline": {
					borderRadius: '6px',
					borderColor: theme.palette.secondary.light,
				},
				"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
					borderColor: theme.palette.secondary.light,
					borderWidth: "2px",
				}
			},
			"& .MuiOutlinedInput-input": {
				fontSize: 14,
			},
		},
	})
);


interface AddMessageButtonProps {
	handleSubmit: (e: React.SyntheticEvent, messageContent: string) => void,
}


const AddMessageButton: FC<AddMessageButtonProps> = (props) => {
	const classes = useStyles();
	const [messageContent, setMessageContent] = useState('');


	function localSubmit(e: React.SyntheticEvent) {
		props.handleSubmit(e, messageContent);
		setMessageContent('');
	}


	return (
		<>
			<form className={classes.formContainer} onSubmit={localSubmit} autoComplete="off">
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
					onChange={e => {
						setMessageContent(e.target.value);
					}}
				/>
			</form>
		</>
	);
}

export default AddMessageButton;
