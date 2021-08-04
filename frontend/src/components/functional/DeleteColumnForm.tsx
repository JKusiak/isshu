import { IconButton } from "@material-ui/core";
import axios from "axios";
import { FC } from "react";
import { useParams } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/ClearOutlined';


interface DeleteColumnFormProps {
      column: any,
      fetchBoard: () => void,
}

const DeleteColumnForm: FC<DeleteColumnFormProps> = (props) => {
      const { boardId } = useParams<{boardId: string}>();


      function deleteColumnReference() {
            deleteFromBoard();
            deleteColumn();
            props.fetchBoard();
      }


      function deleteFromBoard() {
            axios.delete(`http://localhost:5000/projects/deleteBoard/${boardId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
                  data: {
                        columnId: props.column._id,
                  }
            }).then((res) => {

            }).catch((err) => {
                  console.log(err);
            })
      }


      function deleteColumn() {
            axios.delete(`http://localhost:5000/columns/delete/${props.column._id}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  
            }).catch((err) => {
                  console.log(err);
            });
      }


      return (
            <>
                  <IconButton 
                        onClick={() => deleteColumnReference()}
                  >
                        <DeleteIcon />
                  </IconButton>
            </>
      );
}

export default DeleteColumnForm;