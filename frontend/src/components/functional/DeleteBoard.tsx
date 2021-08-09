import { FC, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios';
import DeleteBoardModal from '../modals/DeleteBoardModal';


interface DeleteBoardProps {

}


const DeleteBoard: FC<DeleteBoardProps> = (props) => {
      const { boardId } = useParams<{boardId: string}>();
      const { projectId } = useParams<{projectId: string}>();
      const [open, setOpen] = useState<boolean>(false);
      let history = useHistory();


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


      function handleDelete(e: React.MouseEvent) {
            e.preventDefault();

            deleteBoard();

            setOpen(false);
            history.push(`/projects/${projectId}`);
      }


      function handleGoBack(e: React.MouseEvent) {
            e.preventDefault();

            setOpen(false);  
      }


  return (
      <>
            <DeleteBoardModal
                  setOpen={setOpen}
                  open={open}
                  handleGoBack={handleGoBack}
                  handleDelete={handleDelete}
            />
      </>
  );
}

export default DeleteBoard;