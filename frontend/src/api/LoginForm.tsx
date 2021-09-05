import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { FC, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';


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
	wrongInput: {
		color: "#C62828",
		textAlign: "center",
	}
}));


interface LoginProps {
	loginUser: (credentials: any) => void,
	isValid: boolean, 
	setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
}


const LoginForm: FC<LoginProps> = (props) => {
	const classes = useStyles();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');


	function onSubmit(e: React.SyntheticEvent) {
		e.preventDefault();

		const credentials = {
			email: email,
			password: password,
		}

		props.loginUser(credentials);
	}


	return (
		<>
			<Typography className={classes.header} component="h1" variant="h4">
				Sign in
			</Typography>
			<form className={classes.form} onSubmit={onSubmit} autoComplete="off">
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							className={classes.inputField}
							required
							fullWidth
							autoFocus
							variant="outlined"
							name="email"
							id="email"
							placeholder="Email Address"
							autoComplete="email-address"
							onChange={e => {
								setEmail(e.target.value);
								props.setIsValid(true);
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
							autoComplete="password"
							type="password"
							onChange={e => {
								setPassword(e.target.value);
								props.setIsValid(true);
							}}
						/>
					</Grid>
				</Grid>
				{!props.isValid && <div className={classes.wrongInput}><p>Invalid username or password</p></div>}
				<Button
					className={classes.submitButton}
					fullWidth
					type="submit"
				>
					Sign in
				</Button>
				<Grid container justify="flex-end">
					<Grid item>
						<Link component={RouterLink} to='/register' color='secondary'>
							{"Don't have an account? Register here"}
						</Link>
					</Grid>
				</Grid>
			</form>
		</>
	);
}



export default LoginForm;