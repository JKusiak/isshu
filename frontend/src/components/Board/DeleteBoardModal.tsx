import { Button, IconButton, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/ClearOutlined';
import React, { FC, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) => createStyles({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		width: '330px',
		height: 'auto',
		backgroundColor: theme.palette.primary.main,
		border: '2px solid',
		borderColor: theme.palette.secondary.main,
		borderRadius: '10px',
		boxShadow: theme.shadows[2],
		padding: theme.spacing(2, 4, 3),
	},
	iconButton: {
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
	header: {
		display: 'grid',
		justifyContent: 'center',
		color: theme.palette.secondary.main,
	},
	form: {
		display: 'flex',
		width: '100%',
		marginTop: theme.spacing(5),
	},
	button: {
		margin: theme.spacing(3, 2, 3),
		borderRadius: '10px',
		color: theme.palette.secondary.main,
		backgroundColor: theme.palette.primary.light,
		transition: 'all .12s linear',
		boxShadow: theme.shadows[2],
		"&:hover": {
			cursor: 'pointer',
			boxShadow: theme.shadows[5],
			backgroundColor: theme.palette.primary.light,
		},
	},
}));


interface DeleteBoardModalProps {
	deleteBoard: () => void,
}


const DeleteBoardModal: FC<DeleteBoardModalProps> = (props) => {
	const classes = useStyles();
	const [open, setOpen] = useState<boolean>(false);
	const { projectId } = useParams<{ projectId: string }>();
	let history = useHistory();


	function handleOpen(e: React.MouseEvent) {
		e.preventDefault();

		setOpen(true);
	}


	function handleClose(e: React.MouseEvent) {
		e.preventDefault();

		setOpen(false);
	}


	function handleDelete(e: React.MouseEvent) {
		e.preventDefault();

		props.deleteBoard();
		history.push(`/project/${projectId}`);
	}


	return (
		<>
			<IconButton className={classes.iconButton} onClick={handleOpen}>
				<DeleteIcon className={classes.deleteIcon} />
			</IconButton>


			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<Typography className={classes.header} component="h1" variant="h4">
							Delete board?
						</Typography>
						<div className={classes.form}>
							<Button
								className={classes.button}
								onClick={handleDelete}
								fullWidth
								type="submit"
								variant="contained"
								color="primary"
							>
								Yes
							</Button>

							<Button
								className={classes.button}
								onClick={handleClose}
								fullWidth
								type="submit"
								variant="contained"
								color="primary"
							>
								No
							</Button>
						</div>
					</div>
				</Fade>
			</Modal>
		</>
	);
}

export default DeleteBoardModal;