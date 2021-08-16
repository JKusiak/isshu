import axios from "axios";
import { FC, useContext } from "react";
import { IColumn } from "../../types/ModelTypes";
import DeleteColumnButton from "../buttons/DeleteColumnButton";
import { ActionTypes } from "../reducers/BoardReducer";
import { BoardReducerContext } from "./GetBoard";


interface DeleteColumnProps {
      column: IColumn,
}


const DeleteColumn: FC<DeleteColumnProps> = (props) => {
      const columnId = props.column._id;
      const { dispatch } = useContext(BoardReducerContext);


      function deleteColumn() {
            axios.delete(`http://localhost:5000/columns/delete/${columnId}`, {   
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                  }
            }).then(() => {
                  dispatch({type: ActionTypes.DeleteColumn, payload: columnId})
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