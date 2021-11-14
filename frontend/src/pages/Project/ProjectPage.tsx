import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import GetBoard from "../../api/Board/GetBoard";
import GetBoardsGallery from "../../api/Board/GetBoardsGallery";
import GetUsersGallery from "../../api/User/GetUsersGallery";


const sidebarWidth = 270;

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		display: 'flex',
		width: '100%',
	},
	sidebar: {
		[theme.breakpoints.up('sm')]: {
			width: sidebarWidth,
			flexShrink: 0,
		},
	},
	pageContent: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	menuButton: {
		color: theme.palette.secondary.main,
		[theme.breakpoints.up("sm")]: {
			display: "none"
		},
		marginTop: '1em',
		marginBottom: '1em',
	},
}
));


const ProjectPage = () => {
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = useState<boolean>(false);
	const { path } = useRouteMatch();


	const handleSidebarToggle = () => {
		setMobileOpen(!mobileOpen);
	};


	return (
		<div className={classes.root}>
			<div className={classes.sidebar}>
				<GetUsersGallery mobileOpen={mobileOpen} handleSidebarToggle={handleSidebarToggle} />
			</div>
			<div className={classes.pageContent}>
				<IconButton
					className={classes.menuButton}
					color="inherit"
					aria-label="open drawer"
					onClick={() => { handleSidebarToggle() }}
				>
					<MenuIcon />
				</IconButton>

				<Switch>
					<Route path={`${path}/:boardId`}>
						<GetBoard />
					</Route>
					<Route path={path}>
						<GetBoardsGallery />
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default ProjectPage;