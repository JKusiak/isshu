import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/ClearOutlined';
import { FC, useContext, useState } from "react";
import { BoardReducerContext } from "../../api/Board/GetBoard";
import { ActionTypes } from "../../reducers/BoardReducer";
import { IColumn } from "../../types/ModelTypes";
import ConfirmationModal from "../Commons/ConfirmationModal";



const useStyles = makeStyles((theme: Theme) => createStyles({
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
	const [openModal, setOpenModal] = useState(false);
	const { dispatch } = useContext(BoardReducerContext);


	function handleDelete() {
		dispatch({ type: ActionTypes.DeleteColumn, payload: props.column._id });
		props.deleteColumn();
	}


	return (
		<>
			<IconButton className={classes.button} onClick={() => { setOpenModal(true) }}>
				<DeleteIcon className={classes.icon} />
			</IconButton>

			<ConfirmationModal
				handleConfirm={handleDelete}
				open={openModal}
				setOpen={setOpenModal}
			/>
		</>
	);
}

export default DeleteColumnButton