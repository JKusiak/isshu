import axios from "axios";
import { FC, useEffect, useState } from "react";
import ProjectsBoard from "../ProjectsBoard";


interface GetProjectsBoardProps {

}

const GetProjectsBoard: FC<GetProjectsBoardProps> = (props) => {
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
            <ProjectsBoard projects={projects}/>
      </>
      );
}

export default GetProjectsBoard;