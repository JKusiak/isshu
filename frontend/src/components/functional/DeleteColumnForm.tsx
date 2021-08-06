import { IconButton } from "@material-ui/core";
import axios from "axios";
import { FC } from "react";
import { useParams } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/ClearOutlined';
import { IColumn } from "../../types/ModelTypes";


interface DeleteColumnFormProps {
      column: IColumn,
      fetchBoard: () => void,
}

const DeleteColumnForm: FC<DeleteColumnFormProps> = (props) => {
      const { boardId } = useParams<{boardId: string}>();
      const columnId = props.column._id;


      function deleteColumn() {
            axios.delete(`http://localhost:5000/columns/delete/${columnId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  
            }).catch((err) => {
                  console.log(err);
            });

            props.fetchBoard();
      }


      return (
            <>
                  <IconButton 
                        onClick={() => deleteColumn()}
                  >
                        <DeleteIcon />
                  </IconButton>
            </>
      );
}

export default DeleteColumnForm;