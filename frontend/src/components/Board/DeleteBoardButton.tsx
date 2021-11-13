import { IconButton } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/CloseOutlined';
import React, { FC, useState } from 'react';
import ConfirmationModal from '../Commons/ConfirmationModal';

const useStyles = makeStyles((theme: Theme) => createStyles({
	deleteButton: {
		padding: theme.spacing(2),
		[theme.breakpoints.down('xs')]: {
			paddingRight: 0,
			paddingLeft: 0,
		},
	},
	deleteIcon: {
		transform: 'scale(2)',
		[theme.breakpoints.down('xs')]: {
			transform: 'scale(1.4)',
		},
		color: theme.palette.secondary.main,
	},
}));


interface DeleteBoardProps {
	deleteBoard: () => void,
}


const DeleteBoardButton: FC<DeleteBoardProps> = (props) => {
	const classes = useStyles();
	const [openModal, setOpenModal] = useState(false);


	return (
		<>
			<IconButton 
				className={classes.deleteButton} 
				aria-label='deleteBoardButton' 
				onClick={() => setOpenModal(true)}
			>
				<DeleteIcon className={classes.deleteIcon} />
			</IconButton>

			<ConfirmationModal
				handleConfirm={props.deleteBoard}
				open={openModal}
				setOpen={setOpenModal}
			/>
		</>
	);
}

export default DeleteBoardButton;