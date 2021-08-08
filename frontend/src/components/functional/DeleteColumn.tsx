import axios from "axios";
import { FC } from "react";
import { INestedColumn } from "../../types/ModelTypes";
import DeleteColumnButton from "../buttons/DeleteColumnButton";


interface DeleteColumnProps {
      column: INestedColumn,
      fetchBoard: () => void,
}


const DeleteColumn: FC<DeleteColumnProps> = (props) => {
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
                  <DeleteColumnButton deleteColumn={deleteColumn}/>
            </>
      );
}

export default DeleteColumn;