import React, { FC, useState } from 'react';
import Button from '../ButtonSpacing';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link as RouterLink, useHistory} from 'react-router-dom';
import axios from 'axios';


const useStyles = makeStyles((theme: Theme) => createStyles({
  header: {
    display: 'grid',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
    borderRadius: '10px',
    fontWeight: 600,
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
        borderColor: theme.palette.secondary.main,
        borderWidth: "2px",
      }
    },
  },
  wrongInput: {
    color: "#C62828",
    textAlign: "center",
  }
}));

interface LoginFormProps {
  setLoggedIn: any
}

const LoginForm: FC<LoginFormProps> = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);

  let history = useHistory();

  const credentials = {
    email: email,
    password: password,
  }

  function onSubmit(e: any) {
    e.preventDefault();

    axios.post('http://localhost:5000/login/', credentials)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        props.setLoggedIn(true);
        history.push("/projects");
      }).catch((err) => {
        console.log(err);
        setIsValid(false);
      });
  } 


  return (
    <>
      <Typography className={classes.header} component="h1" variant="h4">
        Sign in
      </Typography>
      <form className={classes.form} onSubmit={onSubmit} autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              className={classes.inputField}
              required
              fullWidth
              autoFocus
              variant="outlined"
              name="email"
              id="email"
              placeholder="Email Address"
              autoComplete="email-address"
              onChange={e => {
                setEmail(e.target.value);
                setIsValid(true);
              }}
              
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.inputField}
              required
              fullWidth
              variant="outlined"
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="password"
              type="password"
              onChange={e => {
                setPassword(e.target.value);
                setIsValid(true);
              }}
            />
          </Grid>
        </Grid>
        {!isValid && <div className={classes.wrongInput}><p>Invalid username or password</p></div>}
        <Button
          className={classes.submit}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
        >
          Sign in
        </Button>
        <Grid container justify="flex-end">
              <Grid item>
                <Link component={RouterLink} to='/register' color='secondary'>
                {"Don't have an account? Register here"}
                </Link>
              </Grid>
        </Grid>
      </form>
    </>
  );
}

    

export default LoginForm;