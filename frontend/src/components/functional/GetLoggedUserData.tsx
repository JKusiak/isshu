import axios from "axios";
import { FC, useEffect, useState } from "react";
import PersonalData from "../PersonalData";


interface GetLoggedUserDataProps {

}

const GetLoggedUserData: FC<GetLoggedUserDataProps> = (props) => {
      const [credentials, setCredentials] = useState({});

      useEffect(() => {
            axios.get('http://localhost:5000/users/profile/token', {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  setCredentials(resp.data);
            }).catch((err) => {
                  console.log(err);
            });
        }, []);


      return (
      <>
            <PersonalData credentials={credentials}/>
      </>
      );
}

export default GetLoggedUserData;