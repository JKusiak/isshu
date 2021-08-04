import React, { FC } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LoginForm from '../functional/LoginForm';


const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    marginTop: theme.spacing(9),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

interface LoginPageProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
}

const LoginPage: FC<LoginPageProps> = (props) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <LoginForm setLoggedIn={props.setLoggedIn}/>
      </div>
    </Container>
  );
}
export default LoginPage;