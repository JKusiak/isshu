import { Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, Fragment } from "react";
import ManageProjectCard from "../../../api/Project/ManageProjectCard";
import { IProject } from "../../../types/ModelTypes";


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
	})
);


interface ProjectListProps {
	projects: [IProject];
}


const ProjectsGallery: FC<ProjectListProps> = (props) => {
	const classes = useStyles();

	function displayProjects() {
		if (props.projects.length > 0) {
			return (props.projects.map((project: IProject) => {
				return (
					<Fragment key={project._id}>
						<ManageProjectCard project={project} />
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
