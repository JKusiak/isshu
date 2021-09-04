import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import RegisterForm from '../api/RegisterForm';


const useStyles = makeStyles((theme: Theme) => createStyles({
	paper: {
		marginTop: theme.spacing(9),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));


const RegisterPage = () => {
	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<RegisterForm />
			</div>
		</Container>
	);
}
export default RegisterPage;