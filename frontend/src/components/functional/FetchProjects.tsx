import axios from "axios";
import { FC, useEffect, useState } from "react";
import ProjectListMain from "../ProjectListMain";

interface FetchProjectsProps {

}

const FetchProjects: FC<FetchProjectsProps> = (props) => {
      const [projects, setProjects] = useState('');

      useEffect(() => {
            axios.get('http://localhost:5000/users/getProjects/60bce0e59c89184d505fa989')
            .then(resp => {
                  const userProjects = resp.data;
                  setProjects(userProjects);
            });
        }, []);

        
      return (
      <>
            <h2>List of all your projects: </h2>
            <ProjectListMain projects = {projects}/>
      </>
      );
}

export default FetchProjects;