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
      button: {
            margin: theme.spacing(3, 2, 3),
            borderRadius: '10px',
            fontWeight: 600,
            background: theme.palette.primary.main,
            "&:hover": {
                  background: theme.palette.primary.dark
            }
      },
}));


interface DeleteBoardFormProps {
      handleClose: any,
}


const DeleteBoardForm: FC<DeleteBoardFormProps> = (props) => {
      const classes = useStyles();
      const { boardId } = useParams<{boardId: any}>();
      const { projectId } = useParams<{projectId: any}>();
      let history = useHistory();


      function onDelete(e: any) {
            e.preventDefault();

            axios.delete(`http://localhost:5000/boards/delete/${boardId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  props.handleClose();
                  history.push(`/projects/${projectId}`);
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
        Delete board?
      </Typography>
      <div className={classes.form}>
        <Button
          className={classes.button}
          onClick={onDelete}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
        >
          Yes
        </Button>

        <Button
          className={classes.button}
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

export default DeleteBoardForm;