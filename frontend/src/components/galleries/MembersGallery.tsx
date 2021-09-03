import { Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { INestedUser } from "../../types/ModelTypes";
import DeleteMember from "../functional/DeleteMember";
import { FetchMembersContext } from "../functional/GetHomePage";
import { getLoggedInUser } from "../functional/GetLoggedInUser";
import ManageMembers from "../functional/ManageMembers";


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
		projectsGrid: {
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
		link: {
			textDecoration: 'none',
			color: theme.palette.secondary.main,
		},
		cardContainer: {
			display: 'flex',
			height: 140,
			[theme.breakpoints.down('xs')]: {
				height: 100,
			},
			width: 'auto',
			transition: 'all .12s linear',
			boxShadow: theme.shadows[2],
			backgroundColor: theme.palette.primary.light,
			"&:hover": {
				boxShadow: theme.shadows[5],
			},
		},
		cardContent: {
			display: 'flex',
			width: '100%',
			justifyContent: 'center',
			alignItems: 'center',
			textDecoration: 'none',
			color: theme.palette.secondary.main,
			maxWidth: '260px',
		},
		name: {
			color: theme.palette.secondary.main,
		},
		description: {
			overflow: 'hidden',
			color: theme.palette.secondary.main,
		},
		image: {
			flex: 'none',
			marginRight: 'auto',
			height: 140,
			width: 140,
			[theme.breakpoints.down('xs')]: {
				height: 100,
				width: 100,
			},
			filter: 'blur(0.5px)'
		},
	})
);


const MembersGallery = () => {
	const classes = useStyles();
	const { members } = useContext(FetchMembersContext);
	const loggedInUser = getLoggedInUser();

	function displayMembers() {
		if (members.length > 0) {
			return (members.map((member: INestedUser) => {
				return (
					<Fragment key={member._id}>
						<Card className={classes.cardContainer}>
							<CardMedia
								className={classes.image}
								component={Link} to={`/user/${member._id}`}
								image={`http://localhost:5000/uploads/organization-${loggedInUser.organizationId}/user-profile/${member._id}.jpg`}
								title="Member profile photo"
							/>
							<CardContent className={classes.cardContent} component={Link} to={`/user/${member._id}`}>
								<Typography className={classes.name} component="h5" variant="h5">
									{member.name} {member.surname}
								</Typography>
							</CardContent>

							<CardActions>
								{loggedInUser._id !== member._id &&
									<DeleteMember member={member} />
								}
							</CardActions>
						</Card>
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

			<div className={classes.projectsGrid}>
				{displayMembers()}
			</div>
		</>
	);
}

export default MembersGallery;
