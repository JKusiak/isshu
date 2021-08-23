import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NestedProjectTemplate } from "../../types/ModelContentTemplate";
import { INestedProject } from "../../types/ModelTypes";
import BoardsGallery from "../galleries/BoardsGallery";


const GetBoardsGallery = () => {
      const { projectId } = useParams<{ projectId: string }>();
      const [project, setProject] = useState<INestedProject>(NestedProjectTemplate);

      useEffect(() => {
            fetchProject();
      }, []);

        
      function fetchProject() {
            axios.get(`http://localhost:5000/projects/getProgress/${projectId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  setProject(res.data);
            }).catch((err) => {
                  console.log(err);
            });
      }


      return (
      <>
            <BoardsGallery project={project} fetchBoards={fetchProject}/>
      </>
      );
}

export default GetBoardsGallery;