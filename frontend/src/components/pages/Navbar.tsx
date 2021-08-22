import { Button, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import ProfileIcon from '@material-ui/icons/AccountCircleOutlined';
import DarkModeOn from '@material-ui/icons/Brightness2';
import DarkModeOff from '@material-ui/icons/Brightness2Outlined';
import ProjectsIcon from '@material-ui/icons/FilterNoneOutlined';
import React, { FC, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../App';
import Icon from '../../resources/logo/icon.svg';
import DarkIcon from '../../resources/logo/icon_darkmode.svg';
import Logo from '../../resources/logo/logo.svg';
import DarkLogo from '../../resources/logo/logo_darkmode.svg';
import AddProject from '../functional/AddProject';


const useStyles = makeStyles((theme) => ({
      root: {
            flexGrow: 1,
      },
      appbar: {
            height: 68,
      },
      toolbar: {
            position: "sticky",
            top: 0,
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
            padding: theme.spacing(2),
            marginLeft: theme.spacing(2),
      },
      buttonIcon: {
            fontSize: 24,
      },
      navbarTextButton: {
            fontSize: '16px',
            '&:hover': {
                  fontWeight: 600
            }
      },
      darkModeButton: {
            transform: 'rotate(20deg) scale(0.9)',
            color: theme.palette.secondary.main,
      },
      darkModeMenu: {
            transform: 'rotate(20deg) scale(0.9)',
            display: 'flex',
            marginLeft: theme.spacing(1),
            alignItems: 'center',
            color: theme.palette.secondary.main,
      },
      offset: theme.mixins.toolbar,
      
}));

interface NavbarProps {
      loggedIn: boolean,
      setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
}


const Navbar: FC<NavbarProps> = (props) => {
      const classes = useStyles();
      const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
      const open = Boolean(anchorEl);
      const {darkMode, setDarkMode} = useContext(DarkModeContext);
        
      const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
      };
      
      const handleClose = () => {
            setAnchorEl(null);
      };

      const handleLogout = () => {
            handleClose();
            localStorage.setItem('token', '');
            props.setLoggedIn(false);
      };

      const handleDarkMode = () => {
            setDarkMode(!darkMode);
            const boolToString = darkMode? 'false': 'true';
            localStorage.setItem('darkMode', boolToString);
      }

      
      return (
      <div className={classes.root}>
            <div className={classes.offset}/>
            <AppBar className={classes.appbar} >
            <Toolbar className={classes.toolbar}>
                  <Link className={classes.linkWrapper} to={props.loggedIn? '/projects' : '/'}>
                        <img className={classes.logoIcon} src={darkMode? DarkIcon : Icon} alt='site icon'/>
                        <img className={classes.logo} src={darkMode? DarkLogo : Logo} alt='site logo'/>
                  </Link>
                  
                  <div className={classes.root}/>
                  {!props.loggedIn && (
                        <>
                        <Button className={classes.navbarTextButton} color="secondary" component={Link} to="/">
                              Home
                        </Button>
                        <Button className={classes.navbarTextButton} color="secondary" component={Link} to="/login">
                              Login
                        </Button>
                        <Button className={classes.navbarTextButton} color="secondary" component={Link} to="/register"> 
                              Register
                        </Button>
                        <IconButton className={classes.darkModeButton} onClick={handleDarkMode}> 
                              {darkMode? <DarkModeOn/> : <DarkModeOff/>}
                        </IconButton>
                        </>
                  )}
                        

                  {props.loggedIn && (
                        <>
                        <Tooltip title="Your projects" aria-label="projects" placement="bottom" enterDelay={300} leaveDelay={100}>
                              <IconButton aria-label="projects" color="secondary" component={Link} to="/projects">
                                    <ProjectsIcon className={classes.buttonIcon}/>
                              </IconButton>
                        </Tooltip>
                        
                        <AddProject/>
                        
                        <Tooltip title="Your profile" aria-label="user profile" placement="bottom" enterDelay={300} leaveDelay={100}>
                              <IconButton aria-label="user profile" onClick={handleMenu} color="secondary">
                                    <ProfileIcon className={classes.buttonIcon}/>
                              </IconButton>
                        </Tooltip>
                        <Menu
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
                              <MenuItem onClick={handleClose} component={Link} to="/user/profile" >Profile</MenuItem>
                              <MenuItem onClick={handleDarkMode}>
                                    Dark mode  
                                    <div className={classes.darkModeMenu}>
                                          {darkMode? <DarkModeOn/> : <DarkModeOff/>}
                                    </div>
                              </MenuItem>
                              <MenuItem onClick={handleLogout} component={Link} to="/" >Logout</MenuItem>
                        </Menu>
                        </>
                  )}   
            </Toolbar>
            </AppBar>
      </div>
      );
}

export default Navbar;