import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardsGallery from "../BoardsGallery";


interface GetBoardsGalleryProps {
}

const GetBoardsGallery: FC<GetBoardsGalleryProps> = (props) => {
      const { id } = useParams<{ id: string }>();
      const [boards, setBoards] = useState([]);

      useEffect(() => {
            axios.get(`http://localhost:5000/projects/getBoards/${id}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  setBoards(resp.data.boards);
            }).catch((err) => {
                  console.log(err);
            });
      }, [id, boards.length]);

        
      return (
      <>
            <BoardsGallery boards={boards} setBoards={setBoards}/>
      </>
      );
}

export default GetBoardsGallery;