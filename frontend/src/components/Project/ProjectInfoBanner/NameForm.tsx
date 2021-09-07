import { TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC } from "react";
import { Action, ActionTypes } from "../../../reducers/ProjectReducer";


const useStyles = makeStyles((theme: Theme) => createStyles({
	nameForm: {
		gridArea: 'projectName',
		justifySelf: 'stretch',
		alignSelf: 'stretch',
	},
	nameStyle: {
		[theme.breakpoints.down('xs')]: {
			fontSize: '36px',
		},
		[theme.breakpoints.up('sm')]: {
			fontSize: '48px',
		},
		fontWeight: 600,
	},
	fontColor: {
		"& .MuiInputBase-root.Mui-disabled": {
			color: '#fafafa',
		},
		"& .MuiInputBase-root": {
			color: 'rgba(255, 255, 255, 0.6)',
		},
		"& .MuiButtonBase-root.MuiIconButton-root.Mui-disabled": {
			color: '#fafafa',
		},
		"& .MuiButtonBase-root.MuiIconButton-root": {
			color: 'rgba(255, 255, 255, 0.6)',
		},
	},
}));


interface DateFormProps {
	isEditing: boolean,
	value: string,
	dispatch: React.Dispatch<Action>,
	actionType: ActionTypes,
	onSubmit: (e: React.SyntheticEvent) => void,
}


const DateForm: FC<DateFormProps> = (props) => {
	const classes = useStyles(props);


	return (
		<form className={classes.nameForm} noValidate autoComplete="off" onSubmit={props.onSubmit}>
			<TextField
				className={classes.fontColor}
				id="project-name"
				disabled={!props.isEditing}
				InputProps={{
					disableUnderline: true,
					classes: {
						input: classes.nameStyle,
					},
				}}
				inputProps={{ min: 0, style: { textAlign: 'center' } }}
				value={props.value || ''}
				onChange={e => { props.dispatch({ type: props.actionType, payload: e.target.value }) }}
			/>
		</form>
	);
}

export default DateForm;