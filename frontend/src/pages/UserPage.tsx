import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import GetData from "../api/User/GetData";
import GetUserIssues from "../api/User/GetUserIssues";


const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		display: 'grid',
		placeItems: 'center',
		marginTop: theme.spacing(2),
	},
}));


const UserPage = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<GetData />
			<GetUserIssues />
		</div>
	);
}

export default UserPage;