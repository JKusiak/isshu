import { FC, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import AddIcon from '@material-ui/icons/AddOutlined';
import IconButton from '@material-ui/core/IconButton';
import UpdateBoardModal from '../modals/UpdateBoardModal';


const useStyles = makeStyles((theme: Theme) => createStyles({

}));


interface AddBoardFormProps {
      boardName: string,
      fetchBoard: () => void,
}


const AddBoardForm: FC<AddBoardFormProps> = (props) => {
      const classes = useStyles();
      const [boardName, setBoardName] = useState<string>(props.boardName);
      let { boardId } = useParams<{boardId: string}>();
      const [updateMode, setUpdateMode] = useState(false);      


      const board = {
            name: boardName,
      }


      function onSubmit(e: React.SyntheticEvent) {
            e.preventDefault();

            axios.post(`http://localhost:5000/boards/update/${boardId}`, board, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {})
            
            setUpdateMode(false);
            props.fetchBoard();
      } 


      return (
      <> 
            <UpdateBoardModal 
                  boardName={boardName} 
                  setBoardName={setBoardName} 
                  updateMode={updateMode}
                  setUpdateMode={setUpdateMode}
                  onSubmit={onSubmit}
            />
      </>
      );
}

export default AddBoardForm;