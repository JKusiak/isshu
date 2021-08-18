import { Card } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import RegisterForm from '../functional/RegisterForm';


const useStyles = makeStyles((theme: Theme) => createStyles({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},    
	paper: {
		width: '40vw',
		minWidth: '430px',
		height: 'auto',
		backgroundColor: theme.palette.primary.main,
		border: '2px solid',
		borderColor: theme.palette.secondary.main,
		borderRadius: '10px',
		boxShadow: theme.shadows[2],
		padding: theme.spacing(2, 4, 3),
	},
	registerButton: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '200px',
		height: '40px',
		marginTop: theme.spacing(8),
		borderRadius: '10px',
		background: 'white',
		fontSize: '14px',
		color: theme.palette.secondary.main,
		transition: 'all .12s linear',
		boxShadow: theme.shadows[2],
		"&:hover": {
			cursor: 'pointer',
			boxShadow: theme.shadows[5],
		},
	},
}));

function RegisterModal() {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
		<div>
		<Card className={classes.registerButton} onClick={handleOpen}>
			GET STARTED
		</Card>
		
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
				<RegisterForm/>
			</div>
			</Fade>
		</Modal>
		</div>
  	);
}

export default RegisterModal;