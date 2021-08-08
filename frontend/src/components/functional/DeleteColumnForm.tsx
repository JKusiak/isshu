import { IconButton } from "@material-ui/core";
import axios from "axios";
import { FC } from "react";
import DeleteIcon from '@material-ui/icons/ClearOutlined';
import { INestedColumn } from "../../types/ModelTypes";


interface DeleteColumnFormProps {
      column: INestedColumn,
      fetchBoard: () => void,
}

const DeleteColumnForm: FC<DeleteColumnFormProps> = (props) => {
      const columnId = props.column._id;


      function deleteColumn() {
            axios.delete(`http://localhost:5000/columns/delete/${columnId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  props.fetchBoard();
            }).catch((err) => {
                  console.log(err);
            });
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