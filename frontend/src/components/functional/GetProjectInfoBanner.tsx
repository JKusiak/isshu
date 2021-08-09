import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProjectTemplate } from "../../types/ModelContentTemplate";
import { IProject } from "../../types/ModelTypes";
import ProjectInfoBanner from "../ProjectInfoBanner";


interface GetProjectInfoBannerProps {
}

const GetProjectInfoBanner: FC<GetProjectInfoBannerProps> = (props) => {
      const { projectId } = useParams<{ projectId: string }>();
      const [project, setProject] = useState<IProject>(ProjectTemplate);

      useEffect(() => {
            fetchProject();
      }, [projectId]);

      
      function fetchProject() {
            axios.get(`http://localhost:5000/projects/${projectId}`, {
            headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
            }).then(resp => {
                  setProject(resp.data);
            }).catch((err) => {
                  console.log(err);
            });  
      }


      function changeData(newProjectData: IProject) {
            axios.post(`http://localhost:5000/projects/update/${projectId}`, newProjectData, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  fetchProject();
            }).catch((err) => {
                  console.log(err);
            });
      }


      return (
      <>
            <ProjectInfoBanner project={project} changeData={changeData}/>
      </>
      );
}

export default GetProjectInfoBanner;