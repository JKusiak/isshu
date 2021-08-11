import { FC } from 'react';
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios';
import DeleteBoardModal from '../modals/DeleteBoardModal';


interface DeleteBoardProps {

}


const DeleteBoard: FC<DeleteBoardProps> = (props) => {
      const { boardId } = useParams<{boardId: string}>();
      const { projectId } = useParams<{projectId: string}>();
      let history = useHistory();


      function deleteBoard(e: React.MouseEvent) {
            e.preventDefault();

            axios.delete(`http://localhost:5000/boards/delete/${boardId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                                  
            }).catch((err) => {
                  console.log(err);
            });
            
            history.push(`/projects/${projectId}`);  
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