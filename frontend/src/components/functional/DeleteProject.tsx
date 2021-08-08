import React, { FC } from 'react';
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios';
import DeleteProjectModal from '../modals/DeleteProjectModal';


interface DeleteProjectFormProps {
      handleSettingsClose: () => void,
}


const DeleteProjectForm: FC<DeleteProjectFormProps> = (props) => {
      const { projectId } = useParams<{projectId: string}>();
      let history = useHistory();


      function onDelete(e: React.MouseEvent) {
            e.preventDefault();

            axios.delete(`http://localhost:5000/projects/delete/${projectId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  props.handleSettingsClose();
                  history.push(`/projects`);
            }).catch((err) => {
                  console.log(err);
            });  
      }
      

  return (
      <>
            <DeleteProjectModal
                  onDelete={onDelete}
                  handleSettingsClose={props.handleSettingsClose}
            />
      </>
  );
}

export default DeleteProjectForm;