import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ProjectsIcon from '@material-ui/icons/FilterNoneOutlined';
import ProfileIcon from '@material-ui/icons/AccountCircleOutlined';
import AddProjectIcon from '@material-ui/icons/AddBoxOutlined';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Logo from '../../resources/isshu_logo.svg';
import Icon from '../../resources/isshu_icon.svg';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles((theme) => ({
      grow: {
            flexGrow: 1,
      },
      sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                  display: 'flex',
            },
            marginRight: "1em"
      },
      image: {
            marginLeft: "2em",
            width: '5%',
            height: '5%'
      },
      logo: {
            width: '12%',
            height: '12%'
      },
      
}));


function Navbar() {
      const classes = useStyles();
      const [authenticated, setAuthenticated] = useState(true);
      const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
      const open = Boolean(anchorEl);
      
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setAuthenticated(event.target.checked);
      };
        
      const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
      };
      
      const handleClose = () => {
            setAnchorEl(null);
      };

      const handleLogout = () => {
            handleClose();
            setAuthenticated(false);
      };


      return (
      <div className={classes.grow}>
      <AppBar position="sticky">
      <Toolbar>
            
            <img className={classes.image} src={Icon} alt='site icon'/>
            <img className={classes.logo} src={Logo} alt='site logo'/>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            {authenticated && (
                  <>
                  <Button color="secondary" component={Link} to="/">
                        Home
                  </Button>
                  <Button color="secondary" component={Link} to="/login">
                        Login
                  </Button>
                  <Button color="secondary" component={Link} to="/register"> 
                        Register
                  </Button>
                  </>
            )}
                  

            {authenticated && (
                  <>
                  <Tooltip title="Your projects" aria-label="projects" placement="bottom" enterDelay={300} leaveDelay={100}>
                        <IconButton aria-label="projects" color="secondary" component={Link} to="/projects">
                              <ProjectsIcon/>
                        </IconButton>
                  </Tooltip>
                  <Tooltip title="Add project" aria-label="add project" placement="bottom" enterDelay={300} leaveDelay={100}>
                        <IconButton aria-label="add project" color="secondary" component={Link} to="/addProject">
                              <AddProjectIcon/>
                        </IconButton>
                  </Tooltip>
                  <Tooltip title="Your profile" aria-label="user profile" placement="bottom" enterDelay={300} leaveDelay={100}>
                        <IconButton  aria-label="user profile" onClick={handleMenu} color="secondary">
                              <ProfileIcon/>
                        </IconButton>
                  </Tooltip>
                  <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                        >
                        <MenuItem onClick={handleClose} component={Link} to="/profile" >Profile</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/settings" >My account</MenuItem>
                        <MenuItem onClick={handleLogout} component={Link} to="/home" >Logout</MenuItem>
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