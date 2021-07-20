import axios from "axios";
import { FC, useEffect, useState } from "react";
import ProjectsGallery from "../ProjectsGallery";


interface GetProjectsGalleryProps {

}

const GetProjectsGallery: FC<GetProjectsGalleryProps> = (props) => {
      const [projects, setProjects] = useState('');

      useEffect (() => {
            axios.get('http://localhost:5000/users/getProjects/hastobesomethinghereforsomereason', {
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