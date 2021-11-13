import { Button, Card, Divider } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, useState } from "react";
import { Link, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import GetArchiveGallery from "../../api/Issue/GetArchiveGallery";
import AddOrganization from "../../api/Organization/AddOrganization";
import ManageOrganizationImage from "../../api/Organization/ManageOrganizationImage";
import UpdateOrganization from "../../api/Organization/UpdateOrganization";
import InvitationsGallery from "../../components/Organization/InvitationsGallery";
import { IOrganization } from "../../types/ModelTypes";
import MembersGalleryPage from "./Subpages/MembersGalleryPage";
import ProjectsGalleryPage from "./Subpages/ProjectsGalleryPage";


const useStyles = makeStyles((theme: Theme) => createStyles({
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
		[theme.breakpoints.down('xs')]: {
			marginTop: theme.spacing(4),
		}
	},
	errorText: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: theme.spacing(1),
		color: 'red',
	},
	buttonsContainer: {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
	divider: {
		[theme.breakpoints.down('xs')]: {
			width: '90%',
		},
		[theme.breakpoints.up('sm')]: {
			width: '40%',
		},
		height: '4px',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		background: theme.palette.secondary.main,
		opacity: 0.15,
	},
	extraMarginTop: {
		marginTop: theme.spacing(4),
	},
	extraMarginBottom: {
		marginBottom: theme.spacing(4),
	},
	cardWrapper: {
		display: 'flex',
		minWidth: '100px',
		[theme.breakpoints.down('xs')]: {
			minWidth: '70px',
		},
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
	const [errorText, setErrorText] = useState('');
	const path = useLocation().pathname;

	function displayOrganization() {
		return (
			<>
				<div className={classes.headerWrapper}>
					<ManageOrganizationImage
						organization={props.organization}
						user={props.user}
						errorText={errorText}
						setErrorText={setErrorText}
					/>
					<UpdateOrganization organization={props.organization} />
				</div>
				<div className={classes.errorText}>
					{errorText}
				</div>

				<Divider className={`${classes.divider} ${classes.extraMarginTop}`} />

				<div className={classes.buttonsContainer}>
					<Card className={classes.cardWrapper}>
						<Button className={classes.button} component={Link} to='/home/projects' style={{backgroundColor: path === '/home/projects' ? '#c7c7c7': ''}}>
								Projects
						</Button>
					</Card>
					<Card className={classes.cardWrapper}>
						<Button className={classes.button} component={Link} to='/home/archive' style={{backgroundColor: path === '/home/archive' ? '#c7c7c7' : ''}}>
								Archive
						</Button>
					</Card>
					<Card className={classes.cardWrapper}>
						<Button className={classes.button} component={Link} to='/home/members' style={{backgroundColor: path === '/home/members' ? '#c7c7c7' : ''}}>
								Members
						</Button>
					</Card>
				</div>

				<Divider className={`${classes.divider} ${classes.extraMarginBottom}`} />

				<Switch>
					<Route path="/home/projects">
						<ProjectsGalleryPage projects={props.user.projects} />
					</Route>
					<Route path="/home/archive">
						<GetArchiveGallery user={props.user} />
					</Route>
					<Route path="/home/members">
						<MembersGalleryPage />
					</Route>
				</Switch>
			</>
		)
	}

	function displayWithoutOrganization() {
		return (
			<>
				<div className={classes.emptyContainer}>
					<AddOrganization />
					<InvitationsGallery user={props.user} />
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