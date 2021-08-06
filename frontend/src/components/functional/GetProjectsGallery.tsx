import axios from "axios";
import { FC, useEffect, useState } from "react";
import { IProject } from "../../types/ModelTypes";
import ProjectsGallery from "../ProjectsGallery";


interface GetProjectsGalleryProps {

}

const GetProjectsGallery: FC<GetProjectsGalleryProps> = (props) => {
      const [projects, setProjects] = useState<[IProject]>([{
            _id: '',
            name: '',
            description: '',
            dateStart: new Date(),
            dateEnd: new Date(),
            creator: {
                  _id: '',
                  name: '',
                  surname: '',
                  email: '',
                  password: '',
                  isAdmin: false,
                  projects: [''],
            },
            boards: [''],
      }]);

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