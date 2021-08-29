import axios from 'axios';
import React, { FC } from 'react';
import { useParams } from "react-router-dom";
import DeleteProjectModal from '../modals/DeleteProjectModal';


interface DeleteProjectProps {
      handleSettingsClose: () => void,
}


const DeleteProject: FC<DeleteProjectProps> = (props) => {
      const { projectId } = useParams<{projectId: string}>();
      

      async function deleteProject() {
            await axios.delete(`http://localhost:5000/projects/delete/${projectId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).catch((err) => {
                  console.log(err);
            });
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