import axios from "axios";
import { useEffect, useState } from "react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { IUser } from "../../types/ModelTypes";
import UsersList from "../UsersList";

interface GetUsersListProps {
      mobileOpen: boolean,
      handleSidebarToggle: () => void,
}

const GetUsersList: FC<GetUsersListProps> = (props) => {
      const { projectId } = useParams<{projectId: string}>();
      const [otherUsers, setOtherUsers] = useState<[IUser]>([{
            _id: '',
            name: '',
            surname: '',
            email: '',
            password: '',
            isAdmin: false,
            projects: [''],
      }]);
      const [contributors, setContributors] = useState<[IUser]>([{
            _id: '',
            name: '',
            surname: '',
            email: '',
            password: '',
            isAdmin: false,
            projects: [''],
      }]);

      
      useEffect(() => {
            fetchOtherUsers();
        }, [projectId]);

      
      useEffect(() => {
            fetchContributors();
      }, [projectId]); 

      
      // fetching users that do not belong to currently displayed project
      function fetchOtherUsers() {
            axios.get(`http://localhost:5000/users/getUsersWithoutProject/${projectId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  setOtherUsers(resp.data);
            }).catch((err) => {
                  console.log(err);
            });
      }


      // fetching users that belong to currently displayed project
        function fetchContributors() {
            axios.get(`http://localhost:5000/users/getUsersByProject/${projectId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  setContributors(resp.data);
            }).catch((err) => {
                  console.log(err);
            });;
        }


        // add currently displayed project to clicked user
        function addProjectToUser(userId: string) {
            const projectIdData = {
                  projectId: projectId
            }

            axios.post(`http://localhost:5000/users/addProject/${userId}`, projectIdData, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((resp) => {
                  
            }).catch((err) => {
                  console.log(err);
            });

            fetchContributors();
            fetchOtherUsers();
        }


      // remove currently displayed project from clicked user
        function removeProjectFromUser(userId: string) {
            axios.delete(`http://localhost:5000/users/deleteProject/${userId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
                  data: {
                        projectId: projectId
                  }
            }).then(() => { 

            }).catch((err) => {
                  console.log(err);
            });

            fetchContributors();
            fetchOtherUsers();
        }


      return (
      <>
            <UsersList 
                  contributors={contributors} 
                  otherUsers={otherUsers} 
                  mobileOpen={props.mobileOpen} 
                  handleSidebarToggle={props.handleSidebarToggle}
                  addProjectToUser={addProjectToUser}
                  removeProjectFromUser={removeProjectFromUser}
            />
      </>
      );
}

export default GetUsersList;