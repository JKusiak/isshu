import axios from 'axios';
import { FC } from 'react';
import { useParams } from "react-router-dom";
import DeleteBoardModal from '../modals/DeleteBoardModal';


interface DeleteBoardProps {

}


const DeleteBoard: FC<DeleteBoardProps> = (props) => {
      const { boardId } = useParams<{boardId: string}>();
      
      
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


  return (
      <>
            <DeleteBoardModal
                  deleteBoard={deleteBoard}
            />
      </>
  );
}

export default DeleteBoard;