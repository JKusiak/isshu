import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme: Theme) => createStyles({
      paper: {
            backgroundColor: theme.palette.primary.main,
            border: '2px solid',
            borderColor: theme.palette.secondary.main,
            borderRadius: '10px',
            boxShadow: theme.shadows[2],
            padding: theme.spacing(2, 4, 3),
      },
      buttonLink: {
            color: theme.palette.secondary.dark,
            textDecoration: 'none',
      },
      button: {
            padding: '0.5em 4em',
            borderRadius: '10px',
            marginTop: '5em',
            "&:hover": {
                  background: theme.palette.primary.dark
            }
      }
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