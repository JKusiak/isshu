import { Button, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import ProfileIcon from '@material-ui/icons/AccountCircleOutlined';
import DarkModeOn from '@material-ui/icons/Brightness2';
import DarkModeOff from '@material-ui/icons/Brightness2Outlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AddProject from '../api/Project/AddProject';
import { DarkModeContext, LoggedInContext } from '../App';
import Icon from '../resources/icon.svg';
import DarkIcon from '../resources/icon_darkmode.svg';
import Logo from '../resources/logo.svg';
import DarkLogo from '../resources/logo_darkmode.svg';



const useStyles = makeStyles((theme) => ({
	appbar: {
		height: theme.spacing(8.5),
		boxShadow: theme.shadows[5],
		zIndex: 100,
		backgroundColor: theme.palette.primary.light,
	},
	toolbar: {
		position: "sticky",
		top: 0,
		[theme.breakpoints.down('xs')]: {
			padding: 0,
		},
	},
	linkWrapper: {
		padding: 0,
		// added to compensate for padding of buttons on the right
		marginLeft: theme.spacing(1.5),
	},
	logoIcon: {
		height: 75,
		width: 75
	},
	logo: {
		height: 75,
		[theme.breakpoints.down('xs')]: {
			display: 'none',
		},
		padding: theme.spacing(2.3),
		marginLeft: theme.spacing(2),
	},
	buttonsContainer: {
		marginLeft: 'auto',
		[theme.breakpoints.down('xs')]: {
			marginRight: theme.spacing(1),
		},
	},
	homeIcon: {
		fontSize: '28px',
		color: theme.palette.secondary.main,
	},
	profileIcon: {
		fontSize: '24px',
		color: theme.palette.secondary.main,
	},
	navbarTextButton: {
		fontSize: '16px',
		[theme.breakpoints.down('xs')]: {
			fontSize: '12px',
			minWidth: 'auto',
		},
		color: theme.palette.secondary.main,
		'&:hover': {
			fontWeight: 600
		}
	},
	darkModeButton: {
		transform: 'rotate(20deg) scale(0.9)',
		color: theme.palette.secondary.main,
		[theme.breakpoints.down('xs')]: {
			transform: 'rotate(20deg) scale(0.7)',
			padding: 0,
		},
	},
	menu: {
		"& .MuiMenu-paper": {
			backgroundColor: theme.palette.primary.light,
		},
	},
	menuItem: {
		color: theme.palette.secondary.main,
	},
	darkModeMenu: {
		transform: 'rotate(20deg) scale(0.9)',
		display: 'flex',
		marginLeft: theme.spacing(1),
		alignItems: 'center',
	},
	offset: theme.mixins.toolbar,

}));


const Navbar = () => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const { darkMode, setDarkMode } = useContext(DarkModeContext);
	const { isLoggedIn, setLoggedIn } = useContext(LoggedInContext);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		handleClose();
		localStorage.setItem('token', '');
		setLoggedIn(false);
	};

	const handleDarkMode = () => {
		setDarkMode(!darkMode);
		const boolToString = darkMode ? 'false' : 'true';
		localStorage.setItem('darkMode', boolToString);
	}


	return (
		<>
			<div className={classes.offset} />
			<AppBar elevation={0} className={classes.appbar} >
				<Toolbar className={classes.toolbar}>
					<Link className={classes.linkWrapper} to={isLoggedIn ? '/home/projects' : '/'}>
						<img className={classes.logoIcon} src={darkMode ? DarkIcon : Icon} alt='site icon' />
						<img className={classes.logo} src={darkMode ? DarkLogo : Logo} alt='site logo' />
					</Link>

					<div className={classes.buttonsContainer}>
						{!isLoggedIn && (
							<>
								<Button className={classes.navbarTextButton} component={Link} to="/">
									Home
								</Button>
								<Button className={classes.navbarTextButton} component={Link} to="/login">
									Login
								</Button>
								<Button className={classes.navbarTextButton} component={Link} to="/register">
									Register
								</Button>
								<IconButton className={classes.darkModeButton} onClick={handleDarkMode}>
									{darkMode ? <DarkModeOn /> : <DarkModeOff />}
								</IconButton>
							</>
						)}


						{isLoggedIn && (
							<>
								<Tooltip title="Home" aria-label="projects" placement="bottom" enterDelay={500} leaveDelay={200}>
									<IconButton aria-label="projects" component={Link} to="/home/projects">
										<HomeIcon className={classes.homeIcon} />
									</IconButton>
								</Tooltip>

								<AddProject />

								<Tooltip title="Your profile" aria-label="user profile" placement="bottom" enterDelay={500} leaveDelay={200}>
									<IconButton aria-label="user profile" onClick={handleMenu}>
										<ProfileIcon className={classes.profileIcon} />
									</IconButton>
								</Tooltip>
								<Menu
									className={classes.menu}
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'center',
									}}
									getContentAnchorEl={null}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'center',
									}}
									open={open}
									onClose={handleClose}
								>
									<MenuItem
										className={classes.menuItem}
										onClick={handleClose}
										component={Link}
										to="/user/profile"
									>
										Profile
									</MenuItem>
									<MenuItem
										className={classes.menuItem}
										onClick={handleDarkMode}
									>
										Dark mode
										<div className={classes.darkModeMenu}>
											{darkMode ? <DarkModeOn /> : <DarkModeOff />}
										</div>
									</MenuItem>
									<MenuItem
										className={classes.menuItem}
										onClick={handleLogout}
										component={Link}
										to="/"
									>
										Logout
									</MenuItem>
								</Menu>
							</>
						)}
					</div>

				</Toolbar>
			</AppBar>
		</>
	);
}

export default Navbar;