import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme: Theme) => createStyles({
      button: {
            padding: '0.5em 4em',
            borderRadius: '10px',
            marginTop: '5em',
            background: 'white',
            "&:hover": {
                  background: theme.palette.action.hover,
            }
      },
      buttonLink: {
            color: theme.palette.secondary.dark,
            textDecoration: 'none',
      },
}));

function ButtonToProjects() {
  const classes = useStyles();


  return (
    <div>
      <Link className={classes.buttonLink} to='/projects'>
            <Button
                  className={classes.button}
                  variant='contained'
                  color='primary'
                  size={'large'}
            >
                  YOUR PROJECTS
            </Button>
      </Link>
      
    </div>
  );
}

export default ButtonToProjects;