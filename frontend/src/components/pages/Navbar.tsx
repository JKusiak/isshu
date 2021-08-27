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
import React, { FC, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../App';
import Icon from '../../resources/logo/icon.svg';
import DarkIcon from '../../resources/logo/icon_darkmode.svg';
import Logo from '../../resources/logo/logo.svg';
import DarkLogo from '../../resources/logo/logo_darkmode.svg';
import AddProject from '../functional/AddProject';


const useStyles = makeStyles((theme) => ({
      appbar: {
            height: theme.spacing(8.5),
            boxShadow: theme.shadows[5],
            zIndex: 1,
            backgroundColor: theme.palette.primary.light,
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
            padding: theme.spacing(2.3),
            marginLeft: theme.spacing(2),
      },
      buttonsContainer: {
            marginLeft: 'auto',
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
            color: theme.palette.secondary.main,
            '&:hover': {
                  fontWeight: 600
            }
      },
      darkModeButton: {
            transform: 'rotate(20deg) scale(0.9)',
            color: theme.palette.secondary.main,
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
      <>
            <div className={classes.offset}/>
            <AppBar elevation={0} className={classes.appbar} >
            <Toolbar className={classes.toolbar}>
                  <Link className={classes.linkWrapper} to={props.loggedIn? '/home/projects' : '/'}>
                        <img className={classes.logoIcon} src={darkMode? DarkIcon : Icon} alt='site icon'/>
                        <img className={classes.logo} src={darkMode? DarkLogo : Logo} alt='site logo'/>
                  </Link>
                  
                  <div className={classes.buttonsContainer}/>
                  {!props.loggedIn && (
                        <>
                        <Button className={classes.navbarTextButton} component={Link} to="/">
                              Home
                        </Button>
                        <Button className={classes.navbarTextButton}component={Link} to="/login">
                              Login
                        </Button>
                        <Button className={classes.navbarTextButton} component={Link} to="/register"> 
                              Register
                        </Button>
                        <IconButton className={classes.darkModeButton} onClick={handleDarkMode}> 
                              {darkMode? <DarkModeOn/> : <DarkModeOff/>}
                        </IconButton>
                        </>
                  )}
                        

                  {props.loggedIn && (
                        <>
                        <Tooltip title="Home" aria-label="projects" placement="bottom" enterDelay={500} leaveDelay={200}>
                              <IconButton aria-label="projects" component={Link} to="/home/projects">
                                    <HomeIcon className={classes.homeIcon}/>
                              </IconButton>
                        </Tooltip>
                        
                        <AddProject/>
                        
                        <Tooltip title="Your profile" aria-label="user profile" placement="bottom" enterDelay={500} leaveDelay={200}>
                              <IconButton aria-label="user profile" onClick={handleMenu}>
                                    <ProfileIcon className={classes.profileIcon}/>
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
                                          {darkMode? <DarkModeOn/> : <DarkModeOff/>}
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
            </Toolbar>
            </AppBar>
      </>
      );
}

export default Navbar;