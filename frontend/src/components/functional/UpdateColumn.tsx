import { FC, useState } from 'react';
import axios from 'axios';
import { INestedColumn } from '../../types/ModelTypes';
import UpdateColumnButton from '../buttons/UpdateColumnButton';


interface UpdateColumnProps {
      column: INestedColumn,
      fetchBoard: () => void,
}


const UpdateColumn: FC<UpdateColumnProps> = (props) => {
      const [columnName, setColumnName] = useState<string>(props.column.name);
      const [updateMode, setUpdateMode] = useState<boolean>(false);      


      function onSubmit(e: React.SyntheticEvent) {
            e.preventDefault();

            const column = {
                  name: columnName,
            }

            axios.post(`http://localhost:5000/columns/update/${props.column._id}`, column, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {})

            setUpdateMode(false);
            props.fetchBoard();
      } 


      return (
      <> 
            <UpdateColumnButton
                  onSubmit={onSubmit}
                  columnName={columnName} 
                  setColumnName={setColumnName} 
                  updateMode={updateMode}
                  setUpdateMode={setUpdateMode}
            />
      </>
      );
}

export default UpdateColumn;