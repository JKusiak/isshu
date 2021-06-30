import axios from "axios";
import { FC, useEffect, useState } from "react";
import PersonalData from "../PersonalData";
import ProjectsListUser from "../ProjectsList";

interface GetUserDataProps {

}

const GetUserData: FC<GetUserDataProps> = (props) => {
      const [credentials, setCredentials] = useState({});
      const [projects, setProjects] = useState('');

      // requests user object by their id
      useEffect(() => {
            axios.get('http://localhost:5000/users/60dca3332045f733ac918b2b', {
                  headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjYTMzMzIwNDVmNzMzYWM5MThiMmIiLCJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWF0IjoxNjI1MDcyNzU0fQ.rU1shosVRHUTC8LOgV43NJOabkCnWHErCwGYErMRH9U'
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