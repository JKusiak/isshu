import { createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import { FC } from 'react';
import { Action, ActionTypes } from '../../reducers/RegisterReducer';


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


interface FieldProps {
	type: string,
	inputType: string,
	setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
	regex: RegExp,
	errorText: string,
	setErrorText: React.Dispatch<React.SetStateAction<string>>,
	setIsSent: React.Dispatch<React.SetStateAction<boolean>>,
	dispatch: (value: Action) => void,
	actionType: ActionTypes,
}


const RegisterField: FC<FieldProps> = (props) => {
	const classes = useStyles();


	return (
		<TextField
			className={classes.inputField}
			required
			fullWidth
			type={props.inputType}
			variant="outlined"
			autoComplete="register"
			name={props.type}
			id={props.type}
			placeholder={props.type}
			onChange={e => {
				if (e.target.value.match(props.regex)) {
					props.dispatch({ type: props.actionType, payload: e.target.value });
					props.setIsValid(true);
				} else {
					props.setErrorText(props.errorText);
					props.setIsValid(false);
				}
				props.setIsSent(false);
			}}
		/>
	);
}

export default RegisterField;

export { };

