import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { FC, useEffect, useReducer } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ActionTypes, registerReducer, UserToRegisterTemplate } from '../../reducers/RegisterReducer';
import RegisterField from './RegisterField';


const useStyles = makeStyles((theme: Theme) => createStyles({
	header: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: theme.spacing(5),
		color: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
	},
	submitButton: {
		margin: theme.spacing(3, 0, 3),
		borderRadius: '10px',
		textTransform: 'none',
		fontSize: '16px',
		color: theme.palette.secondary.main,
		backgroundColor: theme.palette.primary.light,
		transition: 'all .12s linear',
		boxShadow: theme.shadows[2],
		"&:hover": {
			cursor: 'pointer',
			boxShadow: theme.shadows[5],
			backgroundColor: theme.palette.primary.light,
		},
	},
	createdAccount: {
		color: "green",
		textAlign: "center",
	},
	wrongInput: {
		color: "#C62828",
		textAlign: "center",
	},
	toLogin: {
		[theme.breakpoints.down('xs')]: {
			marginBottom: theme.spacing(4),
		},
	}
}));


const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameRegex = /^$|^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const passRegex = /^$|^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const anythingRegex = /^.*$/;


interface RegisterProps {
	registerUser: (user: any) => void,
	isValid: boolean
	setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
	isSent: boolean,
	setIsSent: React.Dispatch<React.SetStateAction<boolean>>,
	errorText: string,
	setErrorText: React.Dispatch<React.SetStateAction<string>>,
}


const RegisterForm: FC<RegisterProps> = (props) => {
	const classes = useStyles();
	const [userReducer, dispatch] = useReducer(registerReducer, UserToRegisterTemplate);
	


	useEffect(() => {
		if (userReducer.repeatPassword === userReducer.password) {
			props.setIsValid(true);
		} else {
			props.setErrorText("Passwords must be the same");
			props.setIsValid(false);
		};
	}, [userReducer.password, userReducer.repeatPassword]);


	function onSubmit(e: React.SyntheticEvent) {
		e.preventDefault();

		const { name, surname, email, password } = userReducer;
		const newUser = { name, surname, email, password };

		if (props.isValid) {
			props.registerUser(newUser);
			
		}
	}


	return (
		<>
			<Typography className={classes.header} component="h1" variant="h4">
				Sign up
			</Typography>
			<form className={classes.form} onSubmit={onSubmit}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<RegisterField
							type='Name'
							inputType='text'
							setIsValid={props.setIsValid}
							regex={nameRegex}
							errorText='Name must only contain lower- and uppercase letters'
							setErrorText={props.setErrorText}
							setIsSent={props.setIsSent}
							dispatch={dispatch}
							actionType={ActionTypes.SetName}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<RegisterField
							type='Surname'
							inputType='text'
							setIsValid={props.setIsValid}
							regex={nameRegex}
							errorText='Surname must only contain lower- and uppercase letters'
							setErrorText={props.setErrorText}
							setIsSent={props.setIsSent}
							dispatch={dispatch}
							actionType={ActionTypes.SetSurname}
						/>
					</Grid>
					<Grid item xs={12}>
						<RegisterField
							type='Email'
							inputType='text'
							setIsValid={props.setIsValid}
							regex={emailRegex}
							errorText='Email must follow valid email format'
							setErrorText={props.setErrorText}
							setIsSent={props.setIsSent}
							dispatch={dispatch}
							actionType={ActionTypes.SetEmail}
						/>
					</Grid>
					<Grid item xs={12}>
						<RegisterField
							type='Password'
							inputType='password'
							setIsValid={props.setIsValid}
							regex={passRegex}
							errorText={'Password must contain \n minimum 8 characters,'
							+ ' at least 1 uppercase letter, 1 lowercase letter,'
							+ ' 1 number and 1 special character (@$!%*?&)'}
							setErrorText={props.setErrorText}
							setIsSent={props.setIsSent}
							dispatch={dispatch}
							actionType={ActionTypes.SetPassword}
						/>
					</Grid>
					<Grid item xs={12}>
						<RegisterField
							type='Confirm_password'
							inputType='password'
							setIsValid={props.setIsValid}
							regex={anythingRegex}
							errorText={''}
							setErrorText={props.setErrorText}
							setIsSent={props.setIsSent}
							dispatch={dispatch}
							actionType={ActionTypes.SetRepeatPassword}
						/>
					</Grid>
				</Grid>
				{props.isSent && <div className={classes.createdAccount}><p id='success_text'>Succesfully created account</p></div>}
				{!props.isValid && <div className={classes.wrongInput}><p id='error_text'>{props.errorText}</p></div>}
				<Button
					className={classes.submitButton}
					type="submit"
					fullWidth
					variant="contained"
				>
					Sign Up
				</Button>
				<Grid container justify="flex-end">
					<Grid className={classes.toLogin} item>
						<Link component={RouterLink} to='/login' color='secondary'>
							{"Already have an account? Log in here"}
						</Link>
					</Grid>
				</Grid>
			</form>
		</>
	);
}

export default RegisterForm;