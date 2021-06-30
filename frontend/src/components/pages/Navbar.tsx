import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ProjectsIcon from '@material-ui/icons/FilterNoneOutlined';
import ProfileIcon from '@material-ui/icons/AccountCircleOutlined';
import AddProjectIcon from '@material-ui/icons/AddBoxOutlined';
import { Button } from '@material-ui/core';
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
      },
      image: {
            marginLeft: "2em",
            width: '5%',
            height: '5%'
      },
      logo: {
            width: '12%',
            height: '12%'
      }
}));


function Navbar() {
      const classes = useStyles();

      return (
      <div className={classes.grow}>
            <AppBar position="sticky">
            <Toolbar>
            
            <img className={classes.image} src={Icon} alt='site icon'/>
            <img className={classes.logo} src={Logo} alt='site logo'/>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
                  <Button color="secondary" component={Link} to="/">
                        Home
                  </Button>
                  <Button color="secondary" component={Link} to="/login">
                        Login
                  </Button>
                  <Button color="secondary" component={Link} to="/register"> 
                        Register
                  </Button>

                  <Tooltip title="Add project" aria-label="add project" placement="bottom" enterDelay={300} leaveDelay={100}>
                        <IconButton aria-label="add project" color="secondary" component={Link} to="/addProject">
                              <AddProjectIcon/>
                        </IconButton>
                  </Tooltip>
                  <Tooltip title="Your projects" aria-label="projects" placement="bottom" enterDelay={300} leaveDelay={100}>
                        <IconButton aria-label="projects" color="secondary" component={Link} to="/projects">
                              <ProjectsIcon/>
                        </IconButton>
                  </Tooltip>
                  <Tooltip title="Your profile" aria-label="user profile" placement="bottom" enterDelay={300} leaveDelay={100}>
                        <IconButton aria-label="user profile" color="secondary" component={Link} to="/profile">
                              <ProfileIcon/>
                        </IconButton>
                  </Tooltip>
            </div>
            </Toolbar>
            </AppBar>
      </div>
      );
}

export default Navbar;