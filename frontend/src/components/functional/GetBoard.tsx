import axios from "axios";
import { useEffect } from "react";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import BoardData from "../BoardData";


interface GetBoardProps {

}

const GetBoard: FC<GetBoardProps> = (props) => {
      const { id } = useParams<{ id: string }>();
      const [board, setBoard] = useState('');

      useEffect(() => {
            axios.get(`http://localhost:5000/boards/${id}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  setBoard(resp.data);
            }).catch((err) => {
                  console.log(err);
            });;
      }, []);


      return (
            <>
                  <BoardData board={board}/>
            </>
      );
}

export default GetBoard;