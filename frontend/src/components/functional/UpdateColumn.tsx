import { FC, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { IColumn, INestedColumn } from '../../types/ModelTypes';
import UpdateColumnButton from '../buttons/UpdateColumnButton';
import { BoardReducerContext } from './GetBoard';
import { ActionTypes } from '../reducers/BoardReducer';


interface UpdateColumnProps {
      column: INestedColumn,
}


const UpdateColumn: FC<UpdateColumnProps> = (props) => {
      const [tempColumnName, setTempColumnName] = useState(props.column.name);
      const dispatch = useContext(BoardReducerContext);


      function onSubmit(e: React.SyntheticEvent) {
            e.preventDefault();

            const column = {
                  name: tempColumnName,
            }

            axios.post(`http://localhost:5000/columns/update/${props.column._id}`, column, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            })
            
            const payload = {
                  newName: tempColumnName,
                  columnId: props.column._id,
            }

            dispatch({type: ActionTypes.UpdateColumn, payload: payload})
      } 


      return (
      <> 
            <UpdateColumnButton
                  tempColumnName={tempColumnName}
                  setTempColumnName={setTempColumnName}
                  permColumnName={props.column.name}
                  onSubmit={onSubmit}
            />
      </>
      );
}

export default UpdateColumn;