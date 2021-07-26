import { FC } from 'react';
import { useHistory, useParams } from "react-router-dom";
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
            display: 'flex',
            width: '100%',
            marginTop: theme.spacing(5),
      },
      delete: {
            margin: theme.spacing(3, 2, 3),
            borderRadius: '10px',
            fontWeight: 600,
            background: theme.palette.primary.main,
            "&:hover": {
                  background: theme.palette.primary.dark
            }
      },
      goBack: {
            margin: theme.spacing(3, 2, 3),
            borderRadius: '10px',
            fontWeight: 600,
            background: theme.palette.secondary.light,
            "&:hover": {
                  background: theme.palette.primary.dark
            }
      },
}));


interface AddProjectFormProps {
      handleClose: any,
}


const AddProjectForm: FC<AddProjectFormProps> = (props) => {
      const classes = useStyles();
      const {id} = useParams<{id: any}>();
      let history = useHistory();


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
        Delete project?
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