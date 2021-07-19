import axios from "axios";
import { FC, useEffect, useState } from "react";
import PersonalData from "../PersonalData";


interface GetUserDataProps {

}

const GetUserData: FC<GetUserDataProps> = (props) => {
      const [credentials, setCredentials] = useState({});

      useEffect(() => {
            axios.get('http://localhost:5000/users/hastobesomethinghereforsomereason', {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  const userCredentials = resp.data;
                  setCredentials(userCredentials);
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

export default GetUserData;