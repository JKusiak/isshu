import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import LoginForm from '../api/LoginForm';


const useStyles = makeStyles((theme: Theme) => createStyles({
	paper: {
		marginTop: theme.spacing(9),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));


const LoginPage = () => {
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