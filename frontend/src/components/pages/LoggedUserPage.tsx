import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import GetLoggedUserData from "../functional/GetLoggedUserData";


const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		display: 'grid',
		placeItems: 'center'
	},
}));


const UserPage = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div>
				<GetLoggedUserData />
			</div>
		</div>
	);
}

export default UserPage;