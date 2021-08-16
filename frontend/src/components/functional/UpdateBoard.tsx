import axios from 'axios';
import { FC, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import UpdateBoardButton from '../buttons/UpdateBoardButton';
import { ActionTypes } from '../reducers/BoardReducer';
import { BoardReducerContext } from './GetBoard';


interface UpdateBoardProps {
      boardName: string,
}


const UpdateBoard: FC<UpdateBoardProps> = (props) => {
      let { boardId } = useParams<{boardId: string}>();
      const [tempBoardName, setTempBoardName] = useState(props.boardName);
      const { dispatch } = useContext(BoardReducerContext);
      

      function onSubmit(e: React.SyntheticEvent) {
            e.preventDefault();
            
            const board = {
                  name: tempBoardName,
            }

            console.log('here')
            axios.post(`http://localhost:5000/boards/update/${boardId}`, board, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            })
               
            dispatch({type: ActionTypes.UpdateBoard, payload: tempBoardName});        
      } 


      return (
      <> 
            <UpdateBoardButton 
                  tempBoardName={tempBoardName}
                  setTempBoardName={setTempBoardName}
                  permBoardName={props.boardName}  
                  onSubmit={onSubmit}
            />
      </>
      );
}

export default UpdateBoard;