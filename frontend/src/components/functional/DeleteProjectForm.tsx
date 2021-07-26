import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
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
      delete: {
            margin: theme.spacing(3, 0, 3),
            borderRadius: '10px',
            fontWeight: 600,
            background: 'red',
            "&:hover": {
                  background: theme.palette.primary.dark
            }
      },
      goBack: {
            margin: theme.spacing(3, 0, 3),
            borderRadius: '10px',
            fontWeight: 600,
            background: 'green',
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


interface AddProjectFormProps {
      handleClose: any,
}


const AddProjectForm: FC<AddProjectFormProps> = (props) => {
      const classes = useStyles();
      const {id} = useParams<{id: any}>();
      let history = useHistory();


      function getCreator() {
            const token = localStorage.getItem('token') || '';
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(atob(base64));
      }


      function onDelete(e: any) {
            e.preventDefault();

            axios.delete(`http://localhost:5000/projects/delete/${id}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  props.handleClose();
                  history.push(`/projects`);
            }).catch((err) => {
                  console.log(err);
            });  
      }

      function onGoBack(e: any) {
            e.preventDefault();

            props.handleClose();  
      }


  return (
    <>
      <Typography className={classes.header} component="h1" variant="h4">
        Do you want to delete project?
      </Typography>
      <div className={classes.form}>
        <Button
          className={classes.delete}
          onClick={onDelete}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
        >
          Yes
        </Button>

        <Button
          className={classes.goBack}
          onClick={onGoBack}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
        >
          No
        </Button>
      </div>
    </>
  );
}

export default AddProjectForm;