import axios from "axios";
import { useEffect, useState } from "react";
import { FC } from "react";
import UsersList from "../UsersList";

interface GetAllUsersProps {

}

const GetAllUsers: FC<GetAllUsersProps> = (props) => {
      const [users, setUsers] = useState([]);

      useEffect(() => {
            axios.get('http://localhost:5000/users', {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            })
            .then(resp => {
                  setUsers(resp.data);
                  console.log(resp.data)
            }).catch((err) => {
                  console.log(err);
            });;
        
        }, []);

        
      return (
      <>
            <UsersList users={users}/>
      </>
      );
}

export default GetAllUsers;