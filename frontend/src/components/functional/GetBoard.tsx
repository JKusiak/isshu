import axios from "axios";
import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BoardTemplate } from "../../types/ModelContentTemplate";
import { INestedBoard } from "../../types/ModelTypes";
import BoardData from "../BoardData";


interface GetBoardProps {
}

const GetBoard: FC<GetBoardProps> = (props) => {
      const { boardId } = useParams<{ boardId: string }>();
      const [board, setBoard] = useState<INestedBoard>(BoardTemplate);

      useEffect(() => {
            fetchBoard();
      },[boardId]);


      function fetchBoard() {
            axios.get(`http://localhost:5000/boards/getContent/${boardId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  setBoard(resp.data);
            }).catch((err) => {
                  console.log(err);
            });
      }


      function addToColumn(columnId: string, issueId: string) {
            const issue = {
                  issueId: issueId
            }

            axios.post(`http://localhost:5000/columns/addIssue/${columnId}`, issue, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
            }).catch((err) => {
                  console.log(err);
            });
            
            fetchBoard();
      }


      function deleteFromColumn(columnId: string, issueId: string) {
            axios.delete(`http://localhost:5000/columns/deleteIssue/${columnId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
                  data: {
                        issueId: issueId
                  }
            }).then(resp => {
                  
            }).catch((err) => {
                  console.log(err);
            });

           
      }


      function swapColumns(sourceColumnId: string, destinationColumnId: string, issueId: string) {
            deleteFromColumn(sourceColumnId, issueId);
            addToColumn(destinationColumnId, issueId);
            fetchBoard();
      }

      return (
            <>
                  <BoardData board={board} fetchBoard={fetchBoard} swapColumns={swapColumns}/>
            </>
      );
}

export default GetBoard;