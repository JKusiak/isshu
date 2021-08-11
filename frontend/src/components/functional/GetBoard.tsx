import axios from "axios";
import { FC, useState, useEffect, createContext } from "react";
import { useParams } from "react-router-dom";
import { BoardTemplate, ColumnTemplate } from "../../types/ModelContentTemplate";
import { IBoard, IColumn } from "../../types/ModelTypes";
import BoardData from "../BoardData";


interface GetBoardProps {
}

// context for avoiding propagating function fetchBoard() for refreshing 
// the board content to child components
export const FetchBoardContext = createContext<() => void>(() => null);


const GetBoard: FC<GetBoardProps> = (props) => {
      const { boardId } = useParams<{ boardId: string }>();
      const [isLoaded, setIsLoaded] = useState<boolean>(false);
      const [board, setBoard] = useState<IBoard>(BoardTemplate);
      const [columns, setColumns] = useState<[IColumn]>([ColumnTemplate]);
      

      useEffect(() => {
            fetchBoard();
      }, []);


      function fetchBoard() {
            axios.get(`http://localhost:5000/boards/${boardId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  setBoard(resp.data);
                  fetchColumns();
            }).catch((err) => {
                  console.log(err);
            });
      }


      function fetchColumns() {
            axios.get(`http://localhost:5000/boards/getColumns/${boardId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  setColumns(resp.data);
                  // is loaded necessary for dnd components to receive columnIDs on first render
                  setIsLoaded(true);
            }).catch((err) => {
                  console.log(err);
            });
      }


      function changeColumn(newColumnId: string, issueId: string) {
            const issue = {
                  columnId: newColumnId,
            }

            axios.post(`http://localhost:5000/issues/update/${issueId}`, issue, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).catch((err) => {
                  console.log(err);
            });

            fetchBoard();
      }


      return (
            <>
            {isLoaded &&
             <FetchBoardContext.Provider value={fetchBoard}>
                  <BoardData board={board} columns={columns} changeColumn={changeColumn}/>
             </FetchBoardContext.Provider>
                  
            }
            </>
      );
}

export default GetBoard;