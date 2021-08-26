import { Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
// hardcoded now just for aesthetic purposes during development <3
import ProjectCover1 from '../../resources/covers/project_cover1.png';
import ProjectCover2 from '../../resources/covers/project_cover2.png';
import ProjectCover3 from '../../resources/covers/project_cover3.png';
import ProjectCover4 from '../../resources/covers/project_cover4.png';
import ProjectCover5 from '../../resources/covers/project_cover5.png';
import ProjectCover6 from '../../resources/covers/project_cover6.png';
import ProjectCover7 from '../../resources/covers/project_cover7.png';
import { INestedUser } from "../../types/ModelTypes";
import DeleteMember from "../functional/DeleteMember";
import { FetchMembersContext } from "../functional/GetHomePage";
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
			marginTop: theme.spacing(4),
			marginBottom: theme.spacing(2),
		},
		projectsGrid: {
			display: 'grid',
			justifyContent: 'center',
			gap: theme.spacing(4),
			gridTemplateColumns: 'repeat(auto-fill, minMax(400px, 400px))',
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
			width: 400,
			transition: 'all .12s linear',
			boxShadow: theme.shadows[2],
			backgroundColor: theme.palette.primary.light,
			"&:hover": {
				boxShadow: theme.shadows[5],
			},
		},
		cardContent: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			textDecoration: 'none',
			color: theme.palette.secondary.main,
			width: '100%',
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
			filter: 'blur(0.5px)'
		},
	})
);


function shuffleProjectCover() {
	const coversArr = [ProjectCover1, ProjectCover2, ProjectCover3, ProjectCover4, ProjectCover5, ProjectCover6, ProjectCover7];

	return coversArr[Math.floor(Math.random() * coversArr.length)];
}


const MembersGallery = () => {
	const classes = useStyles();
	const { members } = useContext(FetchMembersContext);

	function displayMembers() {
		if (members.length > 0) {
			return (members.map((member: INestedUser) => {
				return (
					<Fragment key={member._id}>
						<Card className={classes.cardContainer}>
							<CardMedia
								className={classes.image}
								component={Link} to={`/user/${member._id}`}
								image={shuffleProjectCover()}
								title="Member profile photo"
							/>
							<CardContent className={classes.cardContent} component={Link} to={`/user/${member._id}`}>
								<Typography className={classes.name} component="h5" variant="h5">
									{member.name} {member.surname}
								</Typography>
							</CardContent>
							<CardActions>
								<DeleteMember member={member} />
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
