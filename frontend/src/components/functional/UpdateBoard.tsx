import { FC, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UpdateBoardButton from '../buttons/UpdateBoardButton';
import { FetchBoardContext } from './GetBoard';


interface UpdateBoardProps {
      boardName: string,
}


const UpdateBoard: FC<UpdateBoardProps> = (props) => {
      let { boardId } = useParams<{boardId: string}>();
      const [boardName, setBoardName] = useState<string>(props.boardName);
      const [updateMode, setUpdateMode] = useState<boolean>(false);
      const fetchBoard = useContext(FetchBoardContext);


      useEffect(() => {
            fetchBoard();
      }, [setUpdateMode]);


      function onSubmit(e: React.SyntheticEvent) {
            e.preventDefault();
            
            const board = {
                  name: boardName,
            }

            axios.post(`http://localhost:5000/boards/update/${boardId}`, board, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  setUpdateMode(false);
                  fetchBoard();
            })            
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