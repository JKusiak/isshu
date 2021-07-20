import axios from "axios";
import { FC, useEffect, useState } from "react";
import BoardsGallery from "../BoardsGallery";


interface GetBoardsGalleryProps {
      projectId: string,
}

const GetBoardsGallery: FC<GetBoardsGalleryProps> = (props) => {
      const [boards, setBoards] = useState('');

      useEffect (() => {
            axios.get(`http://localhost:5000/projects/getBoards/${props.projectId}`, {
                  headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            })
            .then(resp => {
                  setBoards(resp.data.boards);
            }).catch((err) => {
                  console.log(err);
            });;
      }, []);

        
      return (
      <>
            <BoardsGallery boards={boards}/>
      </>
      );
}

export default GetBoardsGallery;