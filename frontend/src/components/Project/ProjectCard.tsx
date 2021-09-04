import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC } from "react";
import { Link } from 'react-router-dom';
import { IProject } from "../../types/ModelTypes";


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
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
			textDecoration: 'none',
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
			display: 'flex',
			flexWrap: 'nowrap',
			color: theme.palette.secondary.main,
			overflow: 'hidden',
			maxHeight: '30px',
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
	}
	));


interface ProjectCardProps {
	project: IProject,
	imageExists: boolean,
	imageUrl: string,
}


const ProjectCard: FC<ProjectCardProps> = (props) => {
	const classes = useStyles();

	return (
		<>
			<Card className={classes.cardContainer}>
				<CardContent className={classes.cardContent} component={Link} to={`/project/${props.project._id}`}>
					<div className={classes.empty} />
					<Typography className={classes.name} component="h5" variant="h5">
						{props.project.name}
					</Typography>
					<Typography className={classes.description} variant="subtitle1" color="textSecondary">
						{props.project.description}
					</Typography>
				</CardContent>
				<CardMedia
					className={classes.image}
					image={props.imageUrl}
					component={Link} to={`/project/${props.project._id}`}
					title="Project cover"
				/>
			</Card>
		</>
	);
}

export default ProjectCard;