import { Card, CardMedia, IconButton } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/ClearOutlined';
import { FC, useContext, useState } from 'react';
import { BoardReducerContext } from '../../../api/Board/GetBoard';
import { getLoggedInUser } from '../../../api/User/GetLoggedInUser';
import { ActionTypes } from '../../../reducers/BoardReducer';
import { IAttachment, INestedIssue } from '../../../types/ModelTypes';



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
		// marginBottom: theme.spacing(2),
	},
	attachmentText: {
		height: '15px',
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
	},
	deleteButton: {
		left: '90%',
		bottom: '70%',
		width: '25px',
		borderRadius: '50%',
		background: theme.palette.primary.light,
		padding: 2,
	},
	deleteIcon: {
		fontSize: '18px',
		color: theme.palette.secondary.main,
	},
}));


interface EnlargedAttachmentModalProps {
	issue: INestedIssue,
	clickedAttachment: IAttachment,
	deleteAttachment: () => void,
	deleteImage: (clickedAttachment: IAttachment) => void,
}


const EnlargedAttachmentModal: FC<EnlargedAttachmentModalProps> = (props) => {
	const classes = useStyles();
	const [open, setOpen] = useState<boolean>(false);
	const loggedInUser = getLoggedInUser();
	const { dispatch } = useContext(BoardReducerContext);


	function deleteAttachment() {
		const updatedAttachments = props.issue.attachments.filter(attachment =>
			props.issue.attachments.indexOf(attachment) !== props.issue.attachments.indexOf(props.clickedAttachment));

		const payload = {
			columnId: props.issue.columnId,
			issueId: props.issue._id,
			modified: {
				attachments: updatedAttachments,
			},
		};

		dispatch({ type: ActionTypes.UpdateIssue, payload: payload });
		props.deleteAttachment();
		props.deleteImage(props.clickedAttachment);
	}


	return (
		<>
			<div className={classes.cardWrapper}>
				<Card className={classes.attachmentCard} >
					<CardMedia
						className={classes.image}
						image={`http://localhost:5000/uploads/organization-${loggedInUser.organizationId}/issues/issue-${props.issue._id}/${props.clickedAttachment._id}.jpg`}
						title="Attachment miniature picture"
						onClick={() => setOpen(true)}
					/>
				</Card>
				<IconButton className={classes.deleteButton} onClick={deleteAttachment}>
					<DeleteIcon className={classes.deleteIcon} />
				</IconButton>
				<div className={classes.attachmentText}>
					{props.clickedAttachment.name}
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
						<img
							className={classes.modalImage}
							src={`http://localhost:5000/uploads/organization-${loggedInUser.organizationId}/issues/issue-${props.issue._id}/${props.clickedAttachment._id}.jpg`}
							alt='Attachment enlarged'
						/>
					</div>
				</Fade>
			</Modal>
		</>
	);
}

export default EnlargedAttachmentModal;