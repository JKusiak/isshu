import { TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC } from "react";
import { Action, ActionTypes } from "../../../reducers/ProjectReducer";


const useStyles = makeStyles((theme: Theme) => createStyles({
	inputField: {
		"& .MuiOutlinedInput-root": {
			color: theme.palette.secondary.main,
			"& .MuiOutlinedInput-notchedOutline": {
				borderRadius: '10px',
				borderColor: theme.palette.secondary.light,
			},
			"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
				borderColor: theme.palette.secondary.light,
				borderWidth: "2px",
			}
		},
	},
}));


interface NameProps {
	dispatch: React.Dispatch<Action>,
	setErrorText: React.Dispatch<React.SetStateAction<string>>,
	setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
}


const NameForm: FC<NameProps> = (props) => {
	const classes = useStyles(props);
	const projectNameRegex = /^$|^[A-Za-z][a-z\s]*$/;

	return (
		<TextField
			className={classes.inputField}
			required
			fullWidth
			autoFocus
			variant="outlined"
			name="projectName"
			id="projectName"
			placeholder="Project Name"
			autoComplete="project-name"
			onChange={e => {
				if (e.target.value.match(projectNameRegex)) {
					props.dispatch({ type: ActionTypes.UpdateName, payload: e.target.value })
					props.setIsValid(true);
				} else {
					props.setErrorText("Name must contain only letters and spaces");
					props.setIsValid(false);
				}
			}}
		/>
	);
}

export default NameForm;