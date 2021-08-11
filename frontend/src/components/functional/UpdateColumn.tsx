import { FC, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { IColumn } from '../../types/ModelTypes';
import UpdateColumnButton from '../buttons/UpdateColumnButton';
import { FetchBoardContext } from './GetBoard';


interface UpdateColumnProps {
      column: IColumn,
}


const UpdateColumn: FC<UpdateColumnProps> = (props) => {
      const [columnName, setColumnName] = useState<string>(props.column.name);
      const [updateMode, setUpdateMode] = useState<boolean>(false);
      const fetchBoard = useContext(FetchBoardContext);


      useEffect(() => {
            fetchBoard();
      }, [setUpdateMode]);


      function onSubmit(e: React.SyntheticEvent) {
            e.preventDefault();

            const column = {
                  name: columnName,
            }

            axios.post(`http://localhost:5000/columns/update/${props.column._id}`, column, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  setUpdateMode(false);
                  fetchBoard();
            })
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