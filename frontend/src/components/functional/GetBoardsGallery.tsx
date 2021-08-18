import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BoardTemplate } from "../../types/ModelContentTemplate";
import { IBoard } from "../../types/ModelTypes";
import BoardsGallery from "../galleries/BoardsGallery";



interface GetBoardsGalleryProps {
}

const GetBoardsGallery: FC<GetBoardsGalleryProps> = (props) => {
      const { projectId } = useParams<{ projectId: string }>();
      const [boards, setBoards] = useState<[IBoard]>([BoardTemplate]);


      useEffect(() => {
            fetchBoards();
      }, []);


      function fetchBoards() {
            axios.get(`http://localhost:5000/projects/getBoards/${projectId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  setBoards(resp.data);
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