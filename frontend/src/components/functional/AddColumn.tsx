import { FC, useContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import AddColumnButton from '../buttons/AddColumnButton';
import { FetchBoardContext } from './GetBoard';


interface AddColumnProps {
}


const AddColumn: FC<AddColumnProps> = (props) => {
      let { boardId } = useParams<{boardId: string}>();
      const [columnName, setColumnName] = useState<string>('');
      const [addMode, setAddMode] = useState<boolean>(false);
      const fetchBoard = useContext(FetchBoardContext);

      
      useEffect(() => {
            fetchBoard();
      }, [setAddMode]);


      function addColumnToBoard(columnResponse: AxiosResponse) {
            const columnId = {
                  columnId: columnResponse.data._id,
            };

            axios.post(`http://localhost:5000/boards/addColumn/${boardId}`, columnId, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  setAddMode(false);
                  fetchBoard();
            }).catch((err) => {
                  console.log(err);
            });
      }

      
      function onSubmit(e: React.SyntheticEvent) {
            e.preventDefault();
            
            const column = {
                  columnName: columnName,
            }
            
            axios.post('http://localhost:5000/columns/add', column, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  addColumnToBoard(res);
            })
      } 


      return (
      <>
            <AddColumnButton
                  onSubmit={onSubmit}
                  setColumnName={setColumnName} 
                  addMode={addMode}
                  setAddMode={setAddMode}
            />
      </>
      );
}

export default AddColumn;