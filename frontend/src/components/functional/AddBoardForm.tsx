import { FC, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import axios, { AxiosResponse } from 'axios';
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
      buttonIcon: {
            fontSize: '35px',
            color: theme.palette.secondary.main,
      }
}));


interface AddBoardFormProps {
      fetchBoards: () => void,
      setAddMode: React.Dispatch<React.SetStateAction<boolean>>,
}


const AddBoardForm: FC<AddBoardFormProps> = (props) => {
      const classes = useStyles();
      const [boardName, setBoardName] = useState('');
      let { projectId } = useParams<{projectId: string}>();

      const board = {
            boardName: boardName,
      }


      function addBoardToProject(boardResponse: AxiosResponse) {
            const boardToAdd = {
                  boardId: boardResponse.data._id,
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
                        top: document.body.scrollHeight, 
                        left: 0, 
                        behavior: 'smooth' 
                  });
            }).catch((err) => {
                  console.log(err);
            });
      }


      function createDefaultColumns(boardResponse: AxiosResponse) {
            createAndAddColumn('TO DO', boardResponse);
            createAndAddColumn('IN PROGRESS', boardResponse);
            createAndAddColumn('DONE', boardResponse);
      }


      function createAndAddColumn(columnName: string, boardResponse: AxiosResponse) {
            const column = {
                  columnName: columnName,
            }

            axios.post('http://localhost:5000/columns/add', column, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  const columnToAdd = {
                        columnId: res.data._id,
                  };

                  axios.post(`http://localhost:5000/boards/addColumn/${boardResponse.data._id}`, columnToAdd, {
                        headers: {
                              'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                  }).then((res) => {

                  }).catch((err) => {
                        console.log(err);
                  });
            })
      }


      function onSubmit(e: React.SyntheticEvent) {
            e.preventDefault();

            axios.post('http://localhost:5000/boards/add', board, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  addBoardToProject(res);
                  createDefaultColumns(res);
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
                        type="submit"
                  >
                        <AddIcon className={classes.buttonIcon}/>
                  </IconButton>
            </form>
      </>
      );
}

export default AddBoardForm;