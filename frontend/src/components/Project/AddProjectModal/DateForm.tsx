import DateFnsUtils from '@date-io/date-fns';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
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
		// necessary for styling date picker color
		"& .MuiInputBase-root": {
			color: theme.palette.secondary.main,
			"& .MuiIconButton-root": {
				color: theme.palette.secondary.main,
			},
		},
		"& .MuiFormHelperText-root": {
			color: theme.palette.secondary.main,
		},

	},
}));


interface DateFormProps {
	dispatch: React.Dispatch<Action>,
	setErrorText: React.Dispatch<React.SetStateAction<string>>,
	setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
	value: Date,
	minDate: Date,
	helperText: string,
	actionType: ActionTypes,
}


const DateForm: FC<DateFormProps> = (props) => {
	const classes = useStyles(props);

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				className={classes.inputField}
				required
				fullWidth
				format='dd/MM/yyyy'
				variant="inline"
				helperText={props.helperText}
				value={props.value}
				minDate={props.minDate}
				onChange={newDate => {
					props.dispatch({ type: props.actionType, payload: newDate })
				}}
			/>
		</MuiPickersUtilsProvider>
	);
}

export default DateForm;