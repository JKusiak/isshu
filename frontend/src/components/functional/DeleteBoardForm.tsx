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
                  background: theme.palette.action.hover,
            }
      },
}));


interface DeleteBoardFormProps {
      handleClose: () => void,
}


const DeleteBoardForm: FC<DeleteBoardFormProps> = (props) => {
      const classes = useStyles();
      const { boardId } = useParams<{boardId: string}>();
      const { projectId } = useParams<{projectId: string}>();
      let history = useHistory();


      function deleteBoard() {
            axios.delete(`http://localhost:5000/boards/delete/${boardId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  
            }).catch((err) => {
                  console.log(err);
            });  
      }


      function deleteFromProject() {
            axios.delete(`http://localhost:5000/projects/deleteBoard/${projectId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
                  data: {
                        boardId: boardId,
                  }
            }).then((res) => {

            }).catch((err) => {
                  console.log(err);
            })
      }


      function handleDeleteClick(e: React.MouseEvent) {
            e.preventDefault();

            deleteFromProject();
            deleteBoard();

            props.handleClose();
            history.push(`/projects/${projectId}`);
      }


      function handleGoBack(e: React.MouseEvent) {
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
          onClick={handleDeleteClick}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
        >
          Yes
        </Button>

        <Button
          className={classes.button}
          onClick={handleGoBack}
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