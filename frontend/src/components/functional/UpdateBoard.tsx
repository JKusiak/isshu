import { FC, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UpdateBoardButton from '../buttons/UpdateBoardButton';


interface UpdateBoardProps {
      boardName: string,
      fetchBoard: () => void,
}


const UpdateBoard: FC<UpdateBoardProps> = (props) => {
      const [boardName, setBoardName] = useState<string>(props.boardName);
      let { boardId } = useParams<{boardId: string}>();
      const [updateMode, setUpdateMode] = useState(false);      


      function onSubmit(e: React.SyntheticEvent) {
            e.preventDefault();
            
            const board = {
                  name: boardName,
            }

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

export default UpdateBoard;