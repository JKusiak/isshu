import axios from "axios";
import { useEffect, useState } from "react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import UsersList from "../UsersList";

interface GetUsersListProps {
      mobileOpen: any,
      handleSidebarToggle: () => void,
}

const GetUsersList: FC<GetUsersListProps> = (props) => {
      const {id} = useParams<{id: string}>();
      const [otherUsers, setOtherUsers] = useState<[]>([]);
      const [contributors, setContributors] = useState<[]>([]);

      
      // fetching users that do not belong to currently displayed project
      useEffect(() => {
            let isUnmounted = false;

            axios.get(`http://localhost:5000/users/getUsersWithoutProject/${id}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  if (!isUnmounted) {
                        setOtherUsers(resp.data);
                  }
            }).catch((err) => {
                  console.log(err);
            });;

            return () => {
                  isUnmounted = true;
            };
        }, [id, otherUsers.length]);


       // fetching users that belong to currently displayed project
        useEffect(() => {
            let isUnmounted = false;

            axios.get(`http://localhost:5000/users/getUsersByProject/${id}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  if(!isUnmounted) {
                        setContributors(resp.data);
                  }
            }).catch((err) => {
                  console.log(err);
            });;

            return () => {
                  isUnmounted = true;
            };
        }, [id, contributors.length]);  


        // add currently displayed project to clicked user
        function addProjectToUser(userId: string) {
            const projectId = {
                  projectId: id
            }

            axios.post(`http://localhost:5000/users/addProject/${userId}`, projectId, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((resp) => {
                  setContributors([]);
                  setOtherUsers([]);
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
            }).then(() => { 
                  setContributors([]);
                  setOtherUsers([]);
            }).catch((err) => {
                  console.log(err);
            });;    
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