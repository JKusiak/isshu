import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RegisterForm from '../functional/RegisterForm';


const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    marginTop: theme.spacing(9),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));


function RegisterPage() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <RegisterForm/>
      </div>
    </Container>
  );
}
export default RegisterPage;