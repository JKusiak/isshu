import { FC, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddIcon from '@material-ui/icons/AddOutlined';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme: Theme) => createStyles({
      inputField: {
            "& .MuiOutlinedInput-root": {
                  "& fieldset": { 
                        padding: '0.5em 4em',
                        borderRadius: '10px',
                        borderColor: theme.palette.secondary.main,
                  }, 
                  "&.Mui-focused fieldset": {
                        borderColor: theme.palette.secondary.light,
                        borderWidth: "2px",
                  }
            },
      },
      wrongInput: {
            color: "#C62828",   
            textAlign: "center",
      },
      submitButton: {

      },
      buttonIcon: {
            fontSize: '35px',
            color: theme.palette.secondary.main,
      }
}));


interface AddBoardFormProps {
      fetchBoards: any,
      setAddMode: any,
}


const AddBoardForm: FC<AddBoardFormProps> = (props) => {
      const classes = useStyles();
      const [boardName, setBoardName] = useState('');
      let { projectId } = useParams<{projectId: string}>();

      const board = {
            boardName: boardName,
      }


      function onSubmit(e: any) {
            e.preventDefault();

            axios.post('http://localhost:5000/boards/add', board, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  const boardToAdd = {
                        boardId: res.data._id,
                  };

                  axios.post(`http://localhost:5000/projects/addBoard/${projectId}`, boardToAdd, {
                        headers: {
                              'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                  }).then((res) => {
                        console.log(res.data);
                        props.setAddMode(false);
                        props.fetchBoards();
                        window.scroll({
                              top: document.body.scrollHeight + 100, 
                              left: 0, 
                              behavior: 'smooth' 
                        });
                  }).catch((err) => {
                        console.log(err);
                  });
            })
      } 


  return (
    <> 
      <form onSubmit={onSubmit} autoComplete="off">
                        <TextField
                              className={classes.inputField}
                              required
                              autoFocus
                              variant='outlined'
                              name="boardName"
                              id="boardName"
                              placeholder="Board name"
                              autoComplete="board-name"
                              onChange={e => {
                                    setBoardName(e.target.value);
                              }}
                        />
                        <IconButton
                              className={classes.submitButton}
                              type="submit"
                        >
                              <AddIcon className={classes.buttonIcon}/>
                        </IconButton>
      </form>
    </>
  );
}

export default AddBoardForm;