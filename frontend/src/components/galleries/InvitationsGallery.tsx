import { Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, Fragment } from "react";
import ManageInvitation from "../functional/ManageInvitation";


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		header: {
			textAlign: 'center',
			fontSize: '20px',
			color: theme.palette.secondary.main,
			marginTop: theme.spacing(4),
			marginBottom: theme.spacing(2),
		},
		
		buttons: {
			marginLeft: 'auto',
		}
	})
);

interface InvitationsGalleryProps {
	user: any,
}

const InvitationsGallery: FC<InvitationsGalleryProps> = (props) => {
	const classes = useStyles();

	
	function displayInvitations() {
		if (props.user.invitations.length > 0) {
			return (props.user.invitations.map((invite: any, index: number) => {
				return (
					<Fragment key={index}>
						<ManageInvitation invite={invite} user={props.user}/>
					</Fragment>
				);
			}));
		} else {
			return (
				<Typography className={classes.header}>
					You currently have no invitations to organizations
				</Typography>
			)
		}
	}
	

	return (
		<>
			<div >
				{displayInvitations()}
			</div>
		</>
	);
}

export default InvitationsGallery;
