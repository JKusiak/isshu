import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/ClearOutlined';
import { FC, useContext } from "react";
import { BoardReducerContext } from "../../api/Board/GetBoard";
import { ActionTypes } from "../../reducers/BoardReducer";
import { IColumn } from "../../types/ModelTypes";



const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			padding: theme.spacing(1),
		},
		icon: {
			color: theme.palette.secondary.light,
		},
	}))


interface DeleteColumnButtonProps {
	column: IColumn,
	deleteColumn: () => void,
}


const DeleteColumnButton: FC<DeleteColumnButtonProps> = (props) => {
	const classes = useStyles();
	const { dispatch } = useContext(BoardReducerContext);


	function handleDelete() {
		dispatch({ type: ActionTypes.DeleteColumn, payload: props.column._id });
		props.deleteColumn();
	}


	return (
		<>
			<IconButton className={classes.button} onClick={handleDelete}>
				<DeleteIcon className={classes.icon} />
			</IconButton>
		</>
	);
}

export default DeleteColumnButton