import axios from "axios";
import { FC, useEffect, useState } from "react";
import ProjectsList from "../ProjectsList";


interface GetProjectsListProps {

}

const GetProjectsList: FC<GetProjectsListProps> = (props) => {
      const [projects, setProjects] = useState('');

      useEffect (() => {
            axios.get('http://localhost:5000/users/getProjects/60dca3332045f733ac918b2b', {
                  headers: {
                  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjYTMzMzIwNDVmNzMzYWM5MThiMmIiLCJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWF0IjoxNjI1MDcyNzU0fQ.rU1shosVRHUTC8LOgV43NJOabkCnWHErCwGYErMRH9U'
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
            <ProjectsList projects = {projects}/>
      </>
      );
}

export default GetProjectsList;