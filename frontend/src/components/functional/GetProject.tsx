import axios from "axios";
import { useEffect } from "react";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectData from "../ProjectData";


interface GetProjectProps {

}

const GetProject: FC<GetProjectProps> = (props) => {
      const { id } = useParams<{ id: string }>();
      const [project, setProject] = useState('');


      useEffect(() => {
            axios.get(`http://localhost:5000/projects/${id}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  setProject(resp.data);
            }).catch((err) => {
                  console.log(err);
            });;
      }, [id]);


      return (
            <>
            <ProjectData project={project} projectId={id}/>
            </>
      );
}

export default GetProject;