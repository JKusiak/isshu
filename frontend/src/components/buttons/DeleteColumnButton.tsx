import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/ClearOutlined';
import { FC } from "react";


interface DeleteColumnButtonProps {
	deleteColumn: () => void,
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
	button: {
		padding: theme.spacing(1),
	},
	icon: {
		color: theme.palette.secondary.light,
	},
}))


const DeleteColumnButton: FC<DeleteColumnButtonProps> = (props) => {
	const classes = useStyles();

	
	return (
		<>
		<IconButton className={classes.button} onClick={props.deleteColumn}>
			<DeleteIcon className={classes.icon}/>
		</IconButton>
		</>
	);
}

export default DeleteColumnButton