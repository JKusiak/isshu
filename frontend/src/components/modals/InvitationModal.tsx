import { Button, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC, useState } from 'react';
import { IOrganization } from '../../types/ModelTypes';


const useStyles = makeStyles((theme: Theme) => createStyles({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		width: '430px',
		height: 'auto',
		[theme.breakpoints.down('xs')]: {
			width: '95vw',
		},
		backgroundColor: theme.palette.primary.main,
		border: '2px solid',
		borderColor: theme.palette.secondary.main,
		borderRadius: '10px',
		boxShadow: theme.shadows[2],
		padding: theme.spacing(2, 4, 3),
	},
	header: {
		display: 'grid',
		justifyContent: 'center',
		color: theme.palette.secondary.main,
		[theme.breakpoints.down('xs')]: {
			fontSize: '26px',
		},
	},
	buttonContainer: {
		display: 'flex',
		width: '100%',
		marginTop: theme.spacing(5),
		[theme.breakpoints.down('xs')]: {
			marginTop: theme.spacing(2),
		},
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
	cardContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: 70,
		width: 500,
		[theme.breakpoints.down('xs')]: {
			minHeight: 70,
			width: 200,
		},
		borderRadius: '6px',
		transition: 'all .12s linear',
		boxShadow: theme.shadows[2],
		"&:hover": {
			boxShadow: theme.shadows[5],
			cursor: 'pointer',
		},
		backgroundColor: theme.palette.primary.light,
		marginBottom: theme.spacing(4),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),

	},
	text: {
		textAlign: 'center',
		fontSize: '20px',
		color: theme.palette.secondary.main,
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		[theme.breakpoints.down('xs')]: {
			fontSize: '16px',
			whiteSpace: 'normal',
		},
	},
	org: {
		fontWeight: 'bold',
	},
}));


interface InvitationModalProps {
	invite: IOrganization,
	accept: () => void,
}


const InvitationModal: FC<InvitationModalProps> = (props) => {
	const classes = useStyles();
	const [open, setOpen] = useState<boolean>(false);


	function handleOpen(e: React.MouseEvent) {
		e.preventDefault();

		setOpen(true);
	}


	return (
		<>
			<div className={classes.cardContainer} onClick={handleOpen}>
				<div className={classes.text}>
					You've been invited to join <span className={classes.org}>{props.invite.name}</span>
				</div>
			</div>

			<Modal
				className={classes.modal}
				open={open}
				onClose={() => setOpen(false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<Typography className={classes.header} component="h1" variant="h4">
							Join organization?
						</Typography>
						<div className={classes.buttonContainer}>
							<Button
								className={classes.button}
								onClick={props.accept}
								fullWidth
								type="submit"
								variant="contained"
								color="primary"
							>
								Yes
							</Button>

							<Button
								className={classes.button}
								onClick={() => setOpen(false)}
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

export default InvitationModal;