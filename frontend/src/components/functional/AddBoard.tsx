import { FC, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import AddBoardButton from '../modals/AddBoardButton';


interface AddBoardProps {
      fetchBoards: () => void,
}


const AddBoard: FC<AddBoardProps> = (props) => {
      let { projectId } = useParams<{projectId: string}>();
      const [boardName, setBoardName] = useState('');
      const [addMode, setAddMode] = useState(false);
     

      function addBoardToProject(boardResponse: AxiosResponse) {
            const boardToAdd = {
                  boardId: boardResponse.data._id,
            };

            axios.post(`http://localhost:5000/projects/addBoard/${projectId}`, boardToAdd, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  setAddMode(false);
                  window.scroll({
                        top: document.body.scrollHeight, 
                        left: 0, 
                        behavior: 'smooth' 
                  });
                  props.fetchBoards();
            }).catch((err) => {
                  console.log(err);
            });
      }


      function createAndAddColumn(columnName: string, boardResponse: AxiosResponse) {
            const column = {
                  columnName: columnName,
            }

            axios.post('http://localhost:5000/columns/add', column, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  const columnToAdd = {
                        columnId: res.data._id,
                  };

                  axios.post(`http://localhost:5000/boards/addColumn/${boardResponse.data._id}`, columnToAdd, {
                        headers: {
                              'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                  }).then((res) => {

                  }).catch((err) => {
                        console.log(err);
                  });
            })
      }


      function createDefaultColumns(boardResponse: AxiosResponse) {
            createAndAddColumn('TO DO', boardResponse);
            createAndAddColumn('IN PROGRESS', boardResponse);
            createAndAddColumn('DONE', boardResponse);
      }


      function onSubmit(e: React.SyntheticEvent) {
            e.preventDefault();

            const board = {
                  boardName: boardName,
            }

            axios.post('http://localhost:5000/boards/add', board, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  addBoardToProject(res);
                  createDefaultColumns(res);
            })

      } 


      return (
      <> 
            <AddBoardButton
                  onSubmit={onSubmit}
                  addMode={addMode}
                  setAddMode={setAddMode}
                  setBoardName={setBoardName}
            />
      </>
      );
}

export default AddBoard;