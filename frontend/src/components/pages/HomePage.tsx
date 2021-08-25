import { Button, Card, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC } from "react";
import { Link, Route, Switch } from 'react-router-dom';
import { INestedUser, IOrganization, IProject } from "../../types/ModelTypes";
import ArchiveGallery from "../galleries/ArchiveGallery";
import MembersGallery from "../galleries/MembersGallery";
import ProjectsGallery from "../galleries/ProjectsGallery";


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		header: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			marginTop: theme.spacing(5),
			marginBottom: theme.spacing(5),
			fontWeight: 'bold',
			color: theme.palette.secondary.main,
		},
		buttonsContainer: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		cardWrapper: {
			display: 'flex',
			width: '100px',
			height: '33px',
			backgroundColor: theme.palette.primary.light,
			justifyContent: 'center',
			alignItems: 'center',
			marginLeft: theme.spacing(1),
		},
		button: {
			width: '100%',
			textTransform: 'none',
			fontWeight: 'bold',
			"&:hover": {
				fontWeight: 'bold',
			}
		},
		text: {
			fontSize: '14px',
			color: theme.palette.secondary.main,
		},
	}
));


interface HomePageProps {
	organization: IOrganization,
	members: [INestedUser],
	userProjects: [IProject],
}


const HomePage: FC<HomePageProps> = (props) => {
	const classes = useStyles();
	
	return (
	<>
		<Typography className={classes.header} component="h1" variant="h4">
			{props.organization.name}
		</Typography>
		<div className={classes.buttonsContainer}>
			<Card className={classes.cardWrapper}>
				<Button className={classes.button} component={Link} to='/home/projects'>
					<div className={classes.text}>
						Projects
					</div>
				</Button>
			</Card>
			<Card className={classes.cardWrapper}>
				<Button className={classes.button} component={Link} to='/home/archive'>
					<div className={classes.text}>
						Archive
					</div>
				</Button>
			</Card>
			<Card className={classes.cardWrapper}>
				<Button className={classes.button} component={Link} to='/home/members'>
					<div className={classes.text}>
						Members
					</div>
				</Button>
			</Card>
		</div>

		
		<Switch>
			<Route path="/home/projects">
				<ProjectsGallery projects={props.userProjects}/>
			</Route>
			<Route path="/home/archive">
				<ArchiveGallery archivedIssues={props.organization.archivedIssues}/>
			</Route>
			<Route path="/home/members">
				<MembersGallery members={props.members}/>
			</Route>
		</Switch>
	</>
	);
}

export default HomePage;