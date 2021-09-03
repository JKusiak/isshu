import { Card, CardMedia } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC, useState } from 'react';
import { IAttachment, INestedIssue } from '../../types/ModelTypes';
import { getLoggedInUser } from '../functional/GetLoggedInUser';


const useStyles = makeStyles((theme: Theme) => createStyles({
	cardWrapper: {
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 0,
		width: '142px',
		marginRight: theme.spacing(2),
	},
	attachmentCard: {
		display: 'flex',
		flexShrink: 0,
		height: '80px',
		width: '142px',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: theme.palette.primary.light,
		transition: 'all .12s linear',
		boxShadow: theme.shadows[2],
		"&:hover": {
			boxShadow: theme.shadows[5],
			cursor: 'pointer',
		},
		marginBottom: theme.spacing(2),
	},
	attachmentText: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		marginBottom: theme.spacing(2),
		fontSize: '10px',
		color: theme.palette.secondary.main,
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		width: '90vw',
		height: '90vh',
		backgroundColor: theme.palette.primary.main,
		border: '2px solid',
		borderColor: theme.palette.secondary.main,
		borderRadius: '10px',
		boxShadow: theme.shadows[2],
		padding: 0,
	},
	modalImage: {
		width: '100%',
		height: '100%',
		padding: theme.spacing(0.2),
		borderRadius: '10px',
	}
}));


interface EnlargedAttachmentModalProps {
	issue: INestedIssue,
	attachment: IAttachment,
}


const EnlargedAttachmentModal: FC<EnlargedAttachmentModalProps> = (props) => {
	const classes = useStyles();
	const [open, setOpen] = useState<boolean>(false);
	const loggedInUser = getLoggedInUser();


	function handleOpen(e: React.MouseEvent) {
		e.preventDefault();

		setOpen(true);
	}


	return (
		<>
			<div className={classes.cardWrapper}>
				<Card className={classes.attachmentCard} onClick={() => setOpen(true)}>
					<CardMedia
						className={classes.image}
						image={`http://localhost:5000/uploads/organization-${loggedInUser.organizationId}/issues/issue-${props.issue._id}/${props.attachment._id}.jpg`}
						title="Attachment picture"
					/>
				</Card>
				<div className={classes.attachmentText}>
					{props.attachment.name}
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

							<img className={classes.modalImage} src={`http://localhost:5000/uploads/organization-${loggedInUser.organizationId}/issues/issue-${props.issue._id}/${props.attachment._id}.jpg`} />

					</div>
				</Fade>
			</Modal>
		</>
	);
}

export default EnlargedAttachmentModal;