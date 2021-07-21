import React, { FC, useState } from 'react';
import AddProjectModal from '../modals/AddProjectModal';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ProjectsIcon from '@material-ui/icons/FilterNoneOutlined';
import ProfileIcon from '@material-ui/icons/AccountCircleOutlined';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Logo from '../../resources/isshu_logo.svg';
import Icon from '../../resources/isshu_icon.svg';
import Tooltip from '@material-ui/core/Tooltip';


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
      sectionDesktop: {
            marginRight: "2em"
      },
      image: {
            marginLeft: "2em",
            height: 75,
            width: 75
      },
      logo: {
            height: 75,
      },
      linkWrapper: {

      },
      navbarIconButton: {
            "&:hover": {
                  stroke: 'black',
                  strokeWidth: 0.2,
            }
      },
      icon: {
            width: 25,
            height: 25,
      },
      navbarTextButton: {
            fontSize: '16px',
            '&:hover': {
                  fontWeight: 600
            }
      },
      offset: theme.mixins.toolbar,
      
}));

interface NavbarProps {
      loggedIn: boolean;
      setLoggedIn: any;
}


const Navbar: FC<NavbarProps> = (props) => {
      const classes = useStyles();
      const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
      const open = Boolean(anchorEl);
        
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
            // setAuthenticated(false);
      };


      return (
      <div className={classes.root}>
            <div className={classes.offset}/>
            <AppBar className={classes.appbar} >
            <Toolbar className={classes.toolbar}>
                  
                  <Link className={classes.linkWrapper} to="/">
                        <img className={classes.image} src={Icon} alt='site icon'/>

                        <img className={classes.logo} src={Logo} alt='site logo'/>
                  </Link>
                  
                  <div className={classes.root}/>
                  <div className={classes.sectionDesktop}>
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
                        </>
                  )}
                        

                  {props.loggedIn && (
                        <>
                        <Tooltip title="Your projects" aria-label="projects" placement="bottom" enterDelay={300} leaveDelay={100}>
                              <IconButton className={classes.navbarIconButton} aria-label="projects" color="secondary" component={Link} to="/projects">
                                    <ProjectsIcon className={classes.icon}/>
                              </IconButton>
                        </Tooltip>
                        
                        <AddProjectModal/>
                        
                        <Tooltip title="Your profile" aria-label="user profile" placement="bottom" enterDelay={300} leaveDelay={100}>
                              <IconButton className={classes.navbarIconButton}  aria-label="user profile" onClick={handleMenu} color="secondary">
                                    <ProfileIcon className={classes.icon}/>
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
                              <MenuItem onClick={handleClose} component={Link} to="/user/settings" >My account</MenuItem>
                              <MenuItem onClick={handleLogout} component={Link} to="/" >Logout</MenuItem>
                        </Menu>
                              
                        </>
                  )}   
                  </div>
            </Toolbar>
            </AppBar>
      </div>
      );
}

export default Navbar;