import DateFnsUtils from '@date-io/date-fns';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { FC } from "react";
import { Action, ActionTypes } from "../../../reducers/ProjectReducer";


const useStyles = makeStyles((theme: Theme) => createStyles({
	dateForm: {
		justifySelf: 'end',
		alignSelf: 'center',
		"& .MuiButtonBase-root": {
			padding: 0,
		}
	},
	dateStyle: {
		[theme.breakpoints.down('xs')]: {
			fontSize: '14px',
		},
		[theme.breakpoints.up('sm')]: {
			fontSize: '16px',
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
	value: Date,
	minDate: Date,
	dispatch: React.Dispatch<Action>,
	actionType: ActionTypes,
}


const DateForm: FC<DateFormProps> = (props) => {
	const classes = useStyles(props);


	return (
		<form className={classes.dateForm}>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					className={classes.fontColor}
					format='dd MMMM yyyy'
					variant="inline"
					id="date"
					disabled={!props.isEditing}
					InputProps={{
						disableUnderline: true,
						classes: {
							input: classes.dateStyle,
						},
					}}
					inputProps={{ min: 0, style: { textAlign: 'end' } }}
					minDate={props.minDate}
					value={props.value || ''}
					onChange={newDate => { props.dispatch({ type: props.actionType, payload: newDate }) }}
				/>
			</MuiPickersUtilsProvider>
		</form>
	);
}

export default DateForm;