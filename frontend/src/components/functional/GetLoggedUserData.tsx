import axios from "axios";
import { FC, useEffect, useState } from "react";
import { UserTemplate } from "../../types/ModelContentTemplate";
import { IUser } from "../../types/ModelTypes";
import PersonalData from "../PersonalData";
import { getLoggedInUser } from "./GetLoggedInUser";


interface GetLoggedUserDataProps {

}

const GetLoggedUserData: FC<GetLoggedUserDataProps> = (props) => {
      const [user, setUser] = useState<IUser>(UserTemplate);

      useEffect(() => {
            axios.get(`http://localhost:5000/users/${getLoggedInUser()._id}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  setUser(resp.data);
            }).catch((err) => {
                  console.log(err);
            });
      }, []);


      return (
      <>
            <PersonalData user={user}/>
      </>
      );
}

export default GetLoggedUserData;