import axios from "axios";
import { FC, useContext, useEffect } from "react";
import { IColumn } from "../../types/ModelTypes";
import DeleteColumnButton from "../buttons/DeleteColumnButton";
import { FetchBoardContext } from "./GetBoard";


interface DeleteColumnProps {
      column: IColumn,
}


const DeleteColumn: FC<DeleteColumnProps> = (props) => {
      const columnId = props.column._id;
      const fetchBoard = useContext(FetchBoardContext);


      useEffect(() => {
            fetchBoard();
      }, [deleteColumn]);


      function deleteColumn() {
            axios.delete(`http://localhost:5000/columns/delete/${columnId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  fetchBoard();
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