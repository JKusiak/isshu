import axios from "axios";
import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BoardData from "../BoardData";


interface GetBoardProps {
}

const GetBoard: FC<GetBoardProps> = (props) => {
      const { id } = useParams<{ id: string }>();
      const [board, setBoard] = useState([]);

      useEffect(() => {
            let isUnmounted = false;

            axios.get(`http://localhost:5000/boards/getContent/${id}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  if(!isUnmounted) {
                        setBoard(resp.data.columns);
                  }
            }).catch((err) => {
                  console.log(err);
            });;

            return () => {
                  isUnmounted = true;
            }
      },[id]);


      return (
            <>
                  <BoardData board={board}/>
            </>
      );
}

export default GetBoard;