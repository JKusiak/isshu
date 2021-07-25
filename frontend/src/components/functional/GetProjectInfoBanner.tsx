import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectInfoBanner from "../ProjectInfoBanner";


interface GetProjectInfoBannerProps {
}

const GetProjectInfoBanner: FC<GetProjectInfoBannerProps> = (props) => {
      const { id } = useParams<{ id: string }>();
      const [project, setProject] = useState({});

      useEffect(() => {
            fetchProject();
      }, [id]);

      
      function fetchProject() {
            axios.get(`http://localhost:5000/projects/${id}`, {
            headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
            }).then(resp => {
                  setProject(resp.data);
            }).catch((err) => {
                  console.log(err);
            });  
      }


      function changeData(newProjectData: any) {
            axios.post(`http://localhost:5000/projects/update/${id}`, newProjectData, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  fetchProject();
                  setProject(resp.data);
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