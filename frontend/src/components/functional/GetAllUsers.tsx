import axios from "axios";
import { useEffect, useState } from "react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import UsersList from "../UsersList";

interface GetAllUsersProps {

}

const GetAllUsers: FC<GetAllUsersProps> = (props) => {
      const {id} = useParams<{id: string}>();
      const [noProjectUsers, setNoProjectUsers] = useState([]);
      const [projectUsers, setProjectUsers] = useState([]);

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
        }, []);

       
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
        }, []);  

        
      return (
      <>
            <UsersList projectUsers={projectUsers} noProjectUsers={noProjectUsers}/>
      </>
      );
}

export default GetAllUsers;