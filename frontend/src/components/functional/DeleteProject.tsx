import axios from 'axios';
import React, { FC } from 'react';
import { useHistory, useParams } from "react-router-dom";
import DeleteProjectModal from '../modals/DeleteProjectModal';


interface DeleteProjectProps {
      handleSettingsClose: () => void,
}


const DeleteProject: FC<DeleteProjectProps> = (props) => {
      const { projectId } = useParams<{projectId: string}>();
      let history = useHistory();


      async function deleteProject(e: React.MouseEvent) {
            await axios.delete(`http://localhost:5000/projects/delete/${projectId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).catch((err) => {
                  console.log(err);
            });
            
            history.push(`/projects`);
      }
      

  return (
      <>
            <DeleteProjectModal
                  deleteProject={deleteProject}
                  handleSettingsClose={props.handleSettingsClose}
            />
      </>
  );
}

export default DeleteProject;