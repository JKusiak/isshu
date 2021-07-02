import axios from "axios";
import { FC, useEffect, useState } from "react";
import ProjectsBoard from "../ProjectsBoard";


interface GetProjectsBoardProps {

}

const GetProjectsBoard: FC<GetProjectsBoardProps> = (props) => {
      const [projects, setProjects] = useState('');

      useEffect (() => {
            axios.get('http://localhost:5000/users/getProjects/60dca3332045f733ac918b2b', {
                  headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            })
            .then(resp => {
                  const userProjects = resp.data.projects;
                  setProjects(userProjects);
            }).catch((err) => {
                  console.log(err);
            });;
      }, []);

        
      return (
      <>
            <ProjectsBoard projects = {projects}/>
      </>
      );
}

export default GetProjectsBoard;