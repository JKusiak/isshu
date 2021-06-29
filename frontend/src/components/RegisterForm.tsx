import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
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

function RegisterForm() {
      const classes = useStyles();
    
      return (
      <>
      <Typography component="h1" variant="h4">
            Sign up
            </Typography>
            <form className={classes.form} noValidate>
                  <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                              <TextField
                                    className={classes.inputField}
                                    required
                                    fullWidth
                                    autoFocus
                                    variant="outlined"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="First Name"
                              />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                              <TextField
                                    className={classes.inputField}
                                    required
                                    fullWidth
                                    variant="outlined"
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Last Name"
                              />
                        </Grid>
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
                        <Grid item xs={12}>
                              <TextField
                                    className={classes.inputField}
                                    required
                                    fullWidth
                                    variant="outlined"
                                    name="password"
                                    id="password"
                                    placeholder="Confirm password"
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
                        Sign Up
                  </Button>
                  <Grid container justify="flex-end">
                        <Grid item>
                              <Link component={RouterLink} to='/login' color='secondary'>
                              {"Already have an account? Log in here"}
                              </Link>
                        </Grid>
                  </Grid>
            </form>
      </>
  );
}

export default RegisterForm;