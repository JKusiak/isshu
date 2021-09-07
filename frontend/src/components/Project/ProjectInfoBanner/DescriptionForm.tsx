import { TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC } from "react";
import { Action, ActionTypes } from "../../../reducers/ProjectReducer";


const useStyles = makeStyles((theme: Theme) => createStyles({
	descriptionForm: {
		gridArea: 'description',
		justifySelf: 'stretch',
		alignSelf: 'stretch',
		marginTop: theme.spacing(2),
		marginLeft: theme.spacing(4),
		marginRight: theme.spacing(4),
		overflow: 'hidden',
	},
	descriptionStyle: {
		[theme.breakpoints.down('xs')]: {
			fontSize: '18px',
		},
		[theme.breakpoints.up('sm')]: {
			fontSize: '24px',
		},
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


	function handleEnterMultiline(e: React.KeyboardEvent) {
		if (e.key === "Enter") {
			props.onSubmit(e);
		}
	}


	return (
		<form className={classes.descriptionForm} noValidate autoComplete="off" onSubmit={props.onSubmit}>
			<TextField
				className={classes.fontColor}
				id="project-name"
				fullWidth={true}
				multiline={true}
				onKeyDown={handleEnterMultiline}
				disabled={!props.isEditing}
				InputProps={{
					disableUnderline: true,
					classes: {
						input: classes.descriptionStyle,
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