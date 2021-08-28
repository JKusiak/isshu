import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC } from 'react';
import LoginForm from '../functional/LoginForm';


const useStyles = makeStyles((theme: Theme) => createStyles({
	paper: {
		marginTop: theme.spacing(9),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

interface LoginPageProps {

}

const LoginPage: FC<LoginPageProps> = (props) => {
	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<LoginForm />
			</div>
		</Container>
	);
}
export default LoginPage;