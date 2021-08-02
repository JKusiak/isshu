import { FC, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddIcon from '@material-ui/icons/AddOutlined';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme: Theme) => createStyles({
      buttonIcon: {
            fontSize: '30px',
            color: theme.palette.secondary.main,
      }
}));


interface AddColumnFormProps {
      setAddMode: any,
}


const AddColumnForm: FC<AddColumnFormProps> = (props) => {
      const classes = useStyles();
      const [columnName, setColumnName] = useState('');
      let { boardId } = useParams<{boardId: string}>();


      function onSubmit(e: any) {
            e.preventDefault();
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

                  axios.post(`http://localhost:5000/boards/addColumn/${boardId}`, columnToAdd, {
                        headers: {
                              'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                  }).then((res) => {
                        console.log(res.data);
                        props.setAddMode(false);
                  }).catch((err) => {
                        console.log(err);
                  });
            })
      } 


  return (
    <> 
      <form onSubmit={onSubmit} autoComplete="off">
            <TextField
                  required
                  autoFocus
                  variant='outlined'
                  name="columnName"
                  id="columnName"
                  placeholder="Column name"
                  autoComplete="column-name"
                  onChange={e => {
                        setColumnName(e.target.value);
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

export default AddColumnForm;