import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IBoard } from "../../types/ModelTypes";
import BoardsGallery from "../BoardsGallery";


interface GetBoardsGalleryProps {
}

const GetBoardsGallery: FC<GetBoardsGalleryProps> = (props) => {
      const { projectId } = useParams<{ projectId: string }>();
      const [boards, setBoards] = useState<[IBoard]>([{
            _id: '',
            name: '',
            columns: [''],
      }]);


      useEffect(() => {
            fetchBoards();
      }, [projectId]);


      function fetchBoards() {
            axios.get(`http://localhost:5000/projects/getBoards/${projectId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  setBoards(resp.data.boards);
            }).catch((err) => {
                  console.log(err);
            });
      }

        
      return (
      <>
            <BoardsGallery boards={boards} fetchBoards={fetchBoards}/>
      </>
      );
}

export default GetBoardsGallery;