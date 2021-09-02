import { Button, Card, Divider } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, useState } from "react";
import { Link, Route, Switch } from 'react-router-dom';
import { IOrganization } from "../../types/ModelTypes";
import AddOrganization from "../functional/AddOrganization";
import GetArchiveGallery from "../functional/GetArchiveGallery";
import ManageOrganizationImage from "../functional/ManageOrganizationImage";
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
	const [errorText, setErrorText] = useState('');


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
				<Divider className={`${classes.divider} ${classes.extraMarginBottom}`} />

				<Switch>
					<Route path="/home/projects">
						<ProjectsGallery projects={props.user.projects} />
					</Route>
					<Route path="/home/archive">
						<GetArchiveGallery user={props.user} />
					</Route>
					<Route path="/home/members">
						<MembersGallery />
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