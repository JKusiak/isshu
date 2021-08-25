import { Button, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC } from "react";
import { Link, Route, Switch } from 'react-router-dom';
import { IProject } from "../../types/ModelTypes";
import ProjectsGallery from "../galleries/ProjectsGallery";


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		header: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			minWidth: 680,
			marginTop: theme.spacing(5),
			marginBottom: theme.spacing(5),
			fontWeight: 'bold',
			color: theme.palette.secondary.main,
		},
		buttonsContainer: {

		},
		button: {

		},
	}
));


interface HomePageProps {
	projects: [IProject],
}


const HomePage: FC<HomePageProps> = (props) => {
	const classes = useStyles();
	
	return (
	<>
			<Typography className={classes.header} component="h1" variant="h4">
					Home Page
			</Typography>
			<div className={classes.buttonsContainer}>
				<Button className={classes.button} component={Link} to='/home/members'>
					Members
				</Button >
				<Button className={classes.button} component={Link} to='/home/projects'>
					Projects
				</Button>
				<Button className={classes.button} component={Link} to='/home/archive'>
					Archive
				</Button>
			</div>

			
			<Switch>
				<Route path="/home/projects">
					<ProjectsGallery projects={props.projects}/>
				</Route>
				<Route path="/home/archive">
					{/* <ArchiveGallery/> */}
					Archive
				</Route>
				<Route path="/home/members">
					{/* <MembersGallery/> */}
					Members
				</Route>
			</Switch>
	</>
	);
}

export default HomePage;