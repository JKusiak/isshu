import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, Fragment } from "react";
import { Link, useRouteMatch } from "react-router-dom";
// hardcoded now just for aesthetic purposes during development <3
import ProjectCover1 from '../../resources/covers/project_cover1.png';
import ProjectCover2 from '../../resources/covers/project_cover2.png';
import ProjectCover3 from '../../resources/covers/project_cover3.png';
import ProjectCover4 from '../../resources/covers/project_cover4.png';
import ProjectCover5 from '../../resources/covers/project_cover5.png';
import ProjectCover6 from '../../resources/covers/project_cover6.png';
import ProjectCover7 from '../../resources/covers/project_cover7.png';
import { IProject } from "../../types/ModelTypes";


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		header: {
			display: 'flex',
			width: '100%',
			alignItems: 'center',
			justifyContent: 'center',
			fontSize: '28px',
			[theme.breakpoints.down('xs')]: {
				fontSize: '22px',
			},
			fontWeight: 'bold',
			color: theme.palette.secondary.main,
			paddingBottom: theme.spacing(5),
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
			flexDirection: 'column',
			width: '100%',
			maxWidth: '260px',
			[theme.breakpoints.down('xs')]: {
				maxWidth: '150px',
			},
		},
		// dirty trick to make content display in the center if text
		// is short, if long 'empty' will shrink to zero
		empty: {
			flexBasis: '20px',
			[theme.breakpoints.down('xs')]: {
				flexBasis: 0,
			},
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
			marginLeft: 'auto',
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


function shuffleProjectCover() {
	const coversArr = [ProjectCover1, ProjectCover2, ProjectCover3, ProjectCover4, ProjectCover5, ProjectCover6, ProjectCover7];

	return coversArr[Math.floor(Math.random() * coversArr.length)];
}


interface ProjectListProps {
	projects: [IProject];
}


const ProjectsGallery: FC<ProjectListProps> = (props) => {
	const classes = useStyles();
	const { url } = useRouteMatch();

	function displayProjects() {
		if (props.projects.length > 0) {
			return (props.projects.map((project: IProject) => {
				return (
					<Fragment key={project._id}>
						<Link className={classes.link} to={`/project/${project._id}`}>
							<Card className={classes.cardContainer}>
								<CardContent className={classes.cardContent}>
									<div className={classes.empty} />
									<Typography className={classes.name} component="h5" variant="h5">
										{project.name}
									</Typography>
									<Typography className={classes.description} variant="subtitle1" color="textSecondary">
										{project.description}
									</Typography>
								</CardContent>
								<CardMedia
									className={classes.image}
									image={shuffleProjectCover()}
									title="Project cover"
								/>
							</Card>
						</Link>
					</Fragment>

				);
			}));
		}
	}

	return (
		<>
			<Typography className={classes.header}>
				Your projects
			</Typography>
			<div className={classes.projectsGrid}>
				{displayProjects()}
			</div>
		</>
	);
}

export default ProjectsGallery;
