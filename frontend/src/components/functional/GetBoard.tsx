import axios from "axios";
import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BoardData from "../BoardData";


interface GetBoardProps {
}

const GetBoard: FC<GetBoardProps> = (props) => {
      const { boardId } = useParams<{ boardId: string }>();
      const [board, setBoard] = useState([]);

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
            });;
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
                  fetchBoard();
            }).catch((err) => {
                  console.log(err);
            });;
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
            });;
      }


      return (
            <>
                  <BoardData board={board} addToColumn={addToColumn} deleteFromColumn={deleteFromColumn}/>
            </>
      );
}

export default GetBoard;