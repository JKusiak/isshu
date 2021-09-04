import { Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Fragment, useContext } from "react";
import { FetchMembersContext } from "../../../api/GetHomePage";
import ManageMembers from "../../../api/Organization/ManageMembers";
import ManageMemberCard from "../../../api/User/ManageMemberCard";
import { INestedUser } from "../../../types/ModelTypes";



const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		header: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			fontWeight: 'bold',
			fontSize: '28px',
			color: theme.palette.secondary.main,
			marginBottom: theme.spacing(2),
		},
		galleryGrid: {
			display: 'grid',
			justifyContent: 'center',
			gap: theme.spacing(4),
			gridTemplateColumns: 'repeat(auto-fill, 400px)',
			[theme.breakpoints.down('xs')]: {
				gridTemplateColumns: 'repeat(auto-fill, 250px)',
			},
			marginRight: theme.spacing(8),
			marginLeft: theme.spacing(8),
			marginBottom: theme.spacing(4),
		},


	})
);


const MembersGalleryPage = () => {
	const classes = useStyles();
	const { members } = useContext(FetchMembersContext);



	function displayMembers() {
		if (members.length > 0) {
			return (members.map((member: INestedUser) => {
				return (
					<Fragment key={member._id}>
						<ManageMemberCard member={member} />
					</Fragment>
				);
			}));
		}
	}

	return (
		<>
			<Typography className={classes.header} component="h1" variant="h4">
				Members
			</Typography>

			<ManageMembers />

			<div className={classes.galleryGrid}>
				{displayMembers()}
			</div>
		</>
	);
}

export default MembersGalleryPage;
