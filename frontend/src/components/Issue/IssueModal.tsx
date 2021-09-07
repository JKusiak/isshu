import { Backdrop, createStyles, Fade, makeStyles, Modal, Theme } from "@material-ui/core";
import React, { FC, useState } from "react";
import ArchivizeIssue from "../../api/Issue/ArchivizeIssue";
import ManageAttachments from "../../api/Issue/Attachment/ManageAttachments";
import ManageContributors from "../../api/Issue/Contributor/ManageContributors";
import UpdateDescription from "../../api/Issue/Description/UpdateDescription";
import ManageCompletion from "../../api/Issue/ManageCompletion";
import ManageMessages from "../../api/Issue/Message/ManageMessages";
import UpdateName from "../../api/Issue/Name/UpdateName";
import ManageSteps from "../../api/Issue/Step/ManageSteps";
import { INestedIssue } from "../../types/ModelTypes";
import IssueTagsGallery from "../Tag/IssueTagsGallery";
import CreatorText from "./Creator/CreatorText";


const useStyles = makeStyles<Theme, ModalProps>((theme: Theme) => createStyles({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		pointerEvents: ({ displayOnly }) => displayOnly ? 'none' : 'auto',
		[theme.breakpoints.up('sm')]: {
			display: 'grid',
			gridTemplateColumns: '2fr 1fr',
			gridTemplateRows: 'auto 10fr',
			gridTemplateAreas: `
                              "header header"
                              "leftColumn rightColumn"`,
			width: '75vw',
			minWidth: '430px',
			height: '75vh',
			padding: theme.spacing(4, 4, 4),
		},
		[theme.breakpoints.down('xs')]: {
			display: 'flex',
			flexDirection: 'column',
			width: '75vw',
			height: '75vh',
			overflow: 'scroll',
			padding: theme.spacing(2),
		},
		backgroundColor: theme.palette.primary.main,
		border: '2px solid',
		borderColor: theme.palette.secondary.main,
		borderRadius: '10px',
		boxShadow: theme.shadows[2],
	},
	buttons: {
		display: 'flex',
		[theme.breakpoints.up('sm')]: {
			gridArea: 'header',
			justifySelf: 'end',
			display: 'flex',
			overflowX: 'hidden',
		},
		[theme.breakpoints.down('sm')]: {
			height: '100%',
			marginBottom: theme.spacing(4),
		},
	},
	leftColumn: {
		gridArea: 'leftColumn',
		display: 'flex',
		flexDirection: 'column',
		[theme.breakpoints.up('sm')]: {
			paddingRight: theme.spacing(2),
			minHeight: 0,
			minWidth: 0,
			overflowY: 'auto',
			overflowX: 'hidden',
		},
		[theme.breakpoints.down('sm')]: {
			height: 'auto',
		},
	},
	rightColumn: {
		gridArea: 'rightColumn',
		display: 'flex',
		flexDirection: 'column',

		[theme.breakpoints.up('sm')]: {
			paddingRight: theme.spacing(2),
			paddingLeft: theme.spacing(2),
			minHeight: 0,
			minWidth: 0,
			overflowY: 'auto',
			overflowX: 'hidden',
		},
		[theme.breakpoints.down('sm')]: {
			height: 'auto',
		},
	},

})
);


interface ModalProps {
	issue: INestedIssue,
	isIssueModalOpen: boolean,
	setIssueModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
	displayOnly: boolean,
}


const IssueContentModal: FC<ModalProps> = (props) => {
	const classes = useStyles(props);
	const [isTagsModalOpen, setTagsModalOpen] = useState(false);


	return (
		<Modal
			className={classes.modal}
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={props.isIssueModalOpen}
			onClose={() => { props.setIssueModalOpen(false) }}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={props.isIssueModalOpen}>
				<div className={classes.paper}>
					<UpdateName issue={props.issue} />

					<div className={classes.buttons}>
						<ManageCompletion issue={props.issue} />
						<ArchivizeIssue issue={props.issue} setIssueModalOpen={props.setIssueModalOpen} />
					</div>

					<div className={classes.leftColumn}>
						<IssueTagsGallery
							issue={props.issue}
							isTagsModalOpen={isTagsModalOpen}
							setTagsModalOpen={setTagsModalOpen}
						/>

						<UpdateDescription issue={props.issue} />
						<ManageAttachments issue={props.issue} />
						<ManageMessages issue={props.issue} />
					</div>

					<div className={classes.rightColumn}>
						<CreatorText issue={props.issue} />
						<ManageContributors issue={props.issue} displayOnly={props.displayOnly}/>
						<ManageSteps issue={props.issue} />
					</div>
				</div>
			</Fade>
		</Modal>
	);
}

export default IssueContentModal;