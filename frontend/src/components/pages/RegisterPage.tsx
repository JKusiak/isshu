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
  form: {
    width: '100%',
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
    "&:hover": {
      background: theme.palette.primary.dark
    }
  },
  inputField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": { 
        padding: '0.5em 4em',
        borderRadius: '10px',
      }, 
      "&.Mui-focused fieldset": {
        borderColor: "#000000",
        borderWidth: "2px",
      }
    },
  }
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