import { FC, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UpdateBoardButton from '../modals/UpdateBoardButton';


interface AddBoardFormProps {
      boardName: string,
      fetchBoard: () => void,
}


const AddBoardForm: FC<AddBoardFormProps> = (props) => {
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
            <UpdateBoardButton 
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