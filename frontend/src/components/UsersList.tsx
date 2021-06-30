import axios from "axios";
import { useEffect, useState } from "react";
import { FC } from "react";

interface UsersListProps {

}

const UsersList: FC<UsersListProps> = (props) => {
      const [users, setUsers] = useState([]);

      useEffect(() => {
            axios.get('http://localhost:5000/users')
            .then(resp => {
                  if(resp.data.length > 0) {
                        setUsers(resp.data.map((user: { name: any; }) => user.name));
                  }
            }).catch((err) => {
                  console.log(err);
            });;
        
        }, []);

        
      return (
      <>
            <div>{users[0]}</div>
      </>
      );
}

export default UsersList;