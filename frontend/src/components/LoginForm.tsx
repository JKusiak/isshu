import React from 'react';
import Button from './ButtonSpacing';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link as RouterLink} from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) => createStyles({
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
  }
}));

function LoginForm() {
  const classes = useStyles();

  return (
    <>
      <Typography component="h1" variant="h4">
      Sign in
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              className={classes.inputField}
              required
              fullWidth
              variant="outlined"
              name="email"
              id="email"
              placeholder="Email Address"
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
              type="password"
            />
          </Grid>
        </Grid>
        <Button
          className={classes.submit}
          type="submit"
          fullWidth
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