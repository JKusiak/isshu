import React, { FC, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';


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


const projectNameRegex = /^$|^[A-Za-z][a-z\s]*$/;


interface AddProjectFormProps {
      handleClose: any,
}


const AddProjectForm: FC<AddProjectFormProps> = (props) => {
      const classes = useStyles();
      let history = useHistory();
      const [projectName, setProjectName] = useState('');
      const [description, setDescription] = useState('');
      const [startDate, setStartDate] = useState('');
      const [endDate, setEndDate] = useState('');
      const [isValid, setIsValid] = useState(true);
      const [errorText, setErrorText] = useState('');


      useEffect(() => {
            if (endDate >= startDate) {
                  setIsValid(true);
            } else {
                  setErrorText("End date can not be before start date");
                  setIsValid(false);
            }
      }, [startDate, endDate]);


      const project = {
            name: projectName,
            description: description,
            dateStart: startDate,
            dateEnd: endDate,
            creator: getCreator()
      }

      


      function getCreator() {
            const token = localStorage.getItem('token') || '';
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(atob(base64));
      }


      function onSubmit(e: any) {
            e.preventDefault();

            axios.post('http://localhost:5000/projects/add', project, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                        const newProjectId = {
                              projectId: res.data._id,
                        };

                        axios.post(`http://localhost:5000/users/addProject/${getCreator()._id}`, newProjectId, {
                              headers: {
                                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                              }
                        }).then((res) => {
                              props.handleClose();
                              history.push(`/projects/${newProjectId.projectId}`);
                        }).catch((err) => {
                              console.log(err);
                        });
            }).catch((err) => {
                  console.log(err);
                  setErrorText('Project name already taken');
                  setIsValid(false);
            });  
      } 


  return (
    <>
      <Typography className={classes.header} component="h1" variant="h4">
        Create project
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
              name="projectName"
              id="projectName"
              placeholder="Project Name"
              autoComplete="project-name"
              onChange={e => {
                  if (e.target.value.match(projectNameRegex)) {
                        setProjectName(e.target.value);
                        setIsValid(true);
                  } else {
                        setErrorText("Name must contain only letters and spaces");
                        setIsValid(false);
                  }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.inputField}
              required
              fullWidth
              variant="outlined"
              name="description"
              id="description"
              placeholder="Description"
              autoComplete="description"
              multiline={true}
              onChange={e => {
                setDescription(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.inputField}
              required
              fullWidth
              variant="outlined"
              name="startDate"
              id="startDate"
              placeholder="Start Date"
              autoComplete="startDate"
              type="date"
              helperText="Beginning date of the project"
              onChange={e => {
                setStartDate(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.inputField}
              fullWidth
              variant="outlined"
              name="endDate"
              id="endDate"
              autoComplete="endDate"
              type="date"
              helperText="Ending date of the project (not required)"
              onChange={e => {
                  setEndDate(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        {!isValid && <div className={classes.wrongInput}><p>{errorText}</p></div>}
        <Button
          className={classes.submit}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
        >
          Create
        </Button>
      </form>
    </>
  );
}

export default AddProjectForm;