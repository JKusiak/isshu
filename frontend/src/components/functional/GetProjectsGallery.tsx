import axios from "axios";
import { FC, useEffect, useState } from "react";
import { ProjectTemplate } from "../../types/ModelContentTemplate";
import { IProject } from "../../types/ModelTypes";
import ProjectsGallery from "../galleries/ProjectsGallery";


interface GetProjectsGalleryProps {

}

const GetProjectsGallery: FC<GetProjectsGalleryProps> = (props) => {
      const [projects, setProjects] = useState<[IProject]>([ProjectTemplate]);

      useEffect (() => {
            axios.get('http://localhost:5000/users/getProjects/whyHasToBeWithFlag', {
                  headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            })
            .then(resp => {
                  setProjects(resp.data.projects);
            }).catch((err) => {
                  console.log(err);
            });;
      }, []);

        
      return (
      <>
            <ProjectsGallery projects={projects}/>
      </>
      );
}

export default GetProjectsGallery;