import axios from "axios";
import { useEffect } from "react";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import BoardData from "../BoardData";


interface GetBoardProps {

}

const GetBoard: FC<GetBoardProps> = (props) => {
      const { id } = useParams<{ id: string }>();
      const [board, setBoard] = useState<object[]>();

      // useEffect(() => {
      //       axios.get(`http://localhost:5000/boards/getContent/${id}`, {
      //             headers: {
      //                   'Authorization': `Bearer ${localStorage.getItem('token')}`
      //             }
      //       }).then(resp => {
      //             console.log(resp.data.columns);
      //             setBoard([resp.data.columns]);
      //       }).catch((err) => {
      //             console.log(err);
      //       });;
      // }, );


      return (
            <>
                  <BoardData board={board}/>
            </>
      );
}

export default GetBoard;