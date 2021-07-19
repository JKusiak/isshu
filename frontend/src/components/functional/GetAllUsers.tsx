import axios from "axios";
import { useEffect, useState } from "react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import UsersList from "../UsersList";

interface GetAllUsersProps {
      mobileOpen: any,
      handleSidebarToggle: () => void,
}

const GetAllUsers: FC<GetAllUsersProps> = (props) => {
      const {id} = useParams<{id: string}>();
      const [currentProject, setCurrentProject] = useState();
      const [noProjectUsers, setNoProjectUsers] = useState([]);
      const [projectUsers, setProjectUsers] = useState([]);

      


      // fetching currently displayed project
      useEffect(() => {
            axios.get(`http://localhost:5000/projects/${id}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            })
            .then(resp => {
                  setCurrentProject(resp.data.name);
                  console.log(resp.data.name);
            }).catch((err) => {
                  console.log(err);
            });;
        }, []);


      // fetching users that do not belong to currently displayed project
      useEffect(() => {
            axios.get(`http://localhost:5000/users/getUsersWithoutProject/${id}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            })
            .then(resp => {
                  setNoProjectUsers(resp.data);
            }).catch((err) => {
                  console.log(err);
            });;
        }, [noProjectUsers]);


       // fetching users that belong to currently displayed project
        useEffect(() => {
            axios.get(`http://localhost:5000/users/getUsersByProject/${id}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            })
            .then(resp => {
                  setProjectUsers(resp.data);
            }).catch((err) => {
                  console.log(err);
            });;
        }, [projectUsers]);  


        // add currently displayed project to clicked user
        function addProjectToUser(userId: string) {
            const projectNameData = {
                  projectName: currentProject
            }

            axios.post(`http://localhost:5000/users/addProject/${userId}`, projectNameData, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).catch((err) => {
                  console.log(err);
            });;    
        }


      // remove currently displayed project from clicked user
        function removeProjectFromUser(userId: string) {
            axios.delete(`http://localhost:5000/users/deleteProject/${userId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
                  data: {
                        projectId: id
                  }
            }).catch((err) => {
                  console.log(err);
            });;    
        }


      return (
      <>
            <UsersList 
                  projectUsers={projectUsers} 
                  noProjectUsers={noProjectUsers} 
                  mobileOpen={props.mobileOpen} 
                  handleSidebarToggle={props.handleSidebarToggle}
                  addProjectToUser={addProjectToUser}
                  removeProjectFromUser={removeProjectFromUser}
            />
      </>
      );
}

export default GetAllUsers;