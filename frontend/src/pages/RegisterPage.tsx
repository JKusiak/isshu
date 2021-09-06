import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Register from '../api/Authentication/Register';


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
				<Register />
			</div>
		</Container>
	);
}
export default RegisterPage;