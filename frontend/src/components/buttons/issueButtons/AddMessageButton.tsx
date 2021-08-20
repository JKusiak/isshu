import { TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC, useState } from "react";


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formContainer: {
			flexShrink: 0,
			width: '100%',
			height: '40px',
			marginBottom: theme.spacing(2),
		},
		inputField: {
			width: '100%',
			height: 'auto',
			
			"& .MuiOutlinedInput-root": {
				height: '100%',
				color: theme.palette.secondary.dark,
				"& fieldset": {
					height: 'auto',
					borderColor: theme.palette.secondary.main,
					borderRadius: '6px',
					borderWidth: "1px",
				},
				"&.Mui-focused fieldset": {
					height: 'auto',
					borderColor: theme.palette.secondary.main,
					borderWidth: "2px",
				},
				alignItems: 'start',
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


	return(
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
						inputProps={{style: {fontSize: 14}}}
						onChange={e => {
							setMessageContent(e.target.value);
						}}                  
				/>
			</form>
		</>
	);
}

export default AddMessageButton;
