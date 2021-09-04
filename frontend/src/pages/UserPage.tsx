import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import GetData from "../api/User/GetData";


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
				<GetData />
			</div>
		</div>
	);
}

export default UserPage;