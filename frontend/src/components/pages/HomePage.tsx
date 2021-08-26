import { Button, Card, Divider } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC } from "react";
import { Link, Route, Switch } from 'react-router-dom';
import MockOrgPic from '../../resources/covers/project_cover1.png';
import { IOrganization } from "../../types/ModelTypes";
import AddOrganization from "../functional/AddOrganization";
import GetArchiveGallery from "../functional/GetArchiveGallery";
import UpdateOrganization from "../functional/UpdateOrganization";
import MembersGallery from "../galleries/MembersGallery";
import ProjectsGallery from "../galleries/ProjectsGallery";


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		emptyContainer: {
			display: 'flex',
			height: '90vh',
			width: '100%',
			justifyContent: 'center',
			alignItems: 'center',
		},
		headerWrapper: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
		},
		image: {
			display: 'flex',
			width: '150px',
			height: '150px',
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: theme.spacing(2),
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
		emptyImageIcon: {
			width: 'auto',
			height: 'auto',
			color: theme.palette.secondary.main,
		},
		divider: {
			backgroundColor: theme.palette.secondary.main,
			opacity: 0.2,
			marginTop: theme.spacing(4),
		}
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

				<Divider className={classes.divider}/>


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
			<div className={classes.emptyContainer}>
				<AddOrganization/>
			</div>
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