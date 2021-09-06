import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { FC, useEffect, useReducer, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { ActionTypes, registerReducer, UserToRegisterTemplate } from '../../reducers/RegisterReducer';


const useStyles = makeStyles((theme: Theme) => createStyles({
	header: {
		display: 'grid',
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


const emailRegex = "^$|^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
	+ "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
const nameRegex = /^$|^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const passRegex = /^$|^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;


interface RegisterProps {
	registerUser: (user: any) => void,
	isValid: boolean
	setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
	errorText: string,
	setErrorText: React.Dispatch<React.SetStateAction<string>>,
}


const RegisterForm: FC<RegisterProps> = (props) => {
	const classes = useStyles();
	const [userReducer, dispatch] = useReducer(registerReducer, UserToRegisterTemplate);
	const [isSent, setIsSent] = useState<boolean>(false);
	const history = useHistory();


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

		const {name, surname, email, password } = userReducer;

		const newUser = {name, surname, email, password};

		if (props.isValid) {
			props.registerUser(newUser);
			setIsSent(true);
			setTimeout(() => { history.push('/login') }, 1000);
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
						<TextField
							className={classes.inputField}
							required
							fullWidth
							autoFocus
							variant="outlined"
							name="name"
							id="name"
							placeholder="Name"
							autoComplete="your-name"
							onChange={e => {
								if (e.target.value.match(nameRegex)) {
									dispatch({ type: ActionTypes.SetName, payload: e.target.value });
									props.setIsValid(true);
								} else {
									props.setErrorText("Name must only contain lower- and uppercase letters");
									props.setIsValid(false);
								}
								setIsSent(false);
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							className={classes.inputField}
							required
							fullWidth
							variant="outlined"
							name="surname"
							id="surname"
							placeholder="Surname"
							autoComplete="your-surname"
							onChange={e => {
								if (e.target.value.match(nameRegex)) {
									dispatch({ type: ActionTypes.SetSurname, payload: e.target.value });
									props.setIsValid(true);
								} else {
									props.setErrorText("Surname must only contain lower- and uppercase letters");
									props.setIsValid(false);
								}
								setIsSent(false);
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							className={classes.inputField}
							required
							fullWidth
							variant="outlined"
							name="email"
							id="email"
							placeholder="Email"
							autoComplete="email-address"
							onChange={e => {
								if (e.target.value.match(emailRegex)) {
									dispatch({ type: ActionTypes.SetEmail, payload: e.target.value });
									props.setIsValid(true);
								} else {
									props.setErrorText("Email must follow valid email format");
									props.setIsValid(false);
								}
								setIsSent(false);
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							className={classes.inputField}
							required
							fullWidth
							variant="outlined"
							name="password"
							id="password"
							placeholder="Password"
							type="password"
							autoComplete="password"
							onChange={e => {
								if (e.target.value.match(passRegex)) {
									dispatch({ type: ActionTypes.SetPassword, payload: e.target.value });
									props.setIsValid(true);
								} else {
									props.setErrorText("Password must contain minimum 8 characters,"
										+ " at least 1 uppercase letter, 1 lowercase letter,"
										+ " 1 number and 1 special character (@$!%*?&)");
									props.setIsValid(false);
								}

								setIsSent(false);
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							className={classes.inputField}
							required
							fullWidth
							variant="outlined"
							name="confirmPassword"
							id="confirmPassword"
							placeholder="Confirm password"
							type="password"
							autoComplete="repeat-password"
							onChange={e => {
								dispatch({ type: ActionTypes.SetRepeatPassword, payload: e.target.value });
								setIsSent(false);
							}}
						/>
					</Grid>
				</Grid>
				{isSent && <div className={classes.createdAccount}><p>Succesfully created account</p></div>}
				{!props.isValid && <div className={classes.wrongInput}><p>{props.errorText}</p></div>}
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