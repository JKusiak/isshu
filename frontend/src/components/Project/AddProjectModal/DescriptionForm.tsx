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


interface DescriptionProps {
	dispatch: React.Dispatch<Action>,
}


const DescriptionForm: FC<DescriptionProps> = (props) => {
	const classes = useStyles(props);


	return (
		<TextField
			className={classes.inputField}
			required
			fullWidth
			variant="outlined"
			name="description"
			id="description"
			placeholder="Description"
			autoComplete="description"
			multiline={true}
			onChange={e => {
				props.dispatch({ type: ActionTypes.UpdateDescription, payload: e.target.value })
			}}
		/>
	);
}

export default DescriptionForm;