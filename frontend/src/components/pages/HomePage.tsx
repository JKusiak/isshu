import { Button, Card } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC } from "react";
import { Link, Route, Switch } from 'react-router-dom';
import MockOrgPic from '../../resources/covers/project_cover1.png';
import { IOrganization } from "../../types/ModelTypes";
import AddOrganization from "../functional/AddOrganization";
import GetArchiveGallery from "../functional/GetArchiveGallery";
import UpdateOrganization from "../functional/UpdateOrganization";
import InvitationsGallery from "../galleries/InvitationsGallery";
import MembersGallery from "../galleries/MembersGallery";
import ProjectsGallery from "../galleries/ProjectsGallery";


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		emptyContainer: {
			display: 'flex',
			flexDirection: 'column',
			height: '90vh',
			width: '100%',
			justifyContent: 'center',
			alignItems: 'center',
		},
		headerWrapper: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			marginTop: theme.spacing(2),
		},
		image: {
			display: 'flex',
			width: '150px',
			height: '150px',
			justifyContent: 'center',
			alignItems: 'center',
			marginLeft: theme.spacing(4),
		},
		buttonsContainer: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			paddingTop: theme.spacing(6),
			paddingBottom: theme.spacing(6),

		},
		cardWrapper: {
			display: 'flex',
			minWidth: '100px',
			backgroundColor: theme.palette.primary.light,
			justifyContent: 'center',
			alignItems: 'center',
			marginLeft: theme.spacing(1),
		},
		button: {
			width: '100%',
			textTransform: 'none',
			fontWeight: 'bold',
			borderRadius: 0,
		},
		text: {
			fontSize: '14px',
			color: theme.palette.secondary.main,
		},
		emptyImageIcon: {
			width: 'auto',
			height: 'auto',
			color: theme.palette.secondary.main,
		},
	}
	));


interface HomePageProps {
	organization: IOrganization,
	user: any,
}


const HomePage: FC<HomePageProps> = (props) => {
	const classes = useStyles();


	function displayOrganization() {
		return (
			<>
				<div className={classes.headerWrapper}>
					<img className={classes.image} src={MockOrgPic} />
					<UpdateOrganization organization={props.organization} />
				</div>

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
						<ProjectsGallery projects={props.user.projects} />
					</Route>
					<Route path="/home/archive">
						<GetArchiveGallery user={props.user}/>
					</Route>
					<Route path="/home/members">
						<MembersGallery/>
					</Route>
				</Switch>
			</>
		)
	}

	function displayWithoutOrganization() {
		console.log(props.user);
		return (
			<>
			<div className={classes.emptyContainer}>
				<AddOrganization/>
				<InvitationsGallery user={props.user}/>
			</div>
			</>
		)
	}

	return (
		<>
			{props.user.organizationId ?
				displayOrganization() :
				displayWithoutOrganization()
			}
		</>
	);
}

export default HomePage;