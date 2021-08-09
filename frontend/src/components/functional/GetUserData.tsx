import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserTemplate } from "../../types/ModelContentTemplate";
import { IUser } from "../../types/ModelTypes";
import PersonalData from "../PersonalData";


interface GetUserDataProps {

}

const GetUserData: FC<GetUserDataProps> = (props) => {
      const { userId } = useParams<{ userId: string }>();
      const [user, setUser] = useState<IUser>(UserTemplate);

      useEffect(() => {
            axios.get(`http://localhost:5000/users/${userId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  const userCredentials = resp.data;
                  setUser(userCredentials);
            }).catch((err) => {
                  console.log(err);
            });
        }, [userId]);


      return (
      <>
            <PersonalData user={user}/>
      </>
      );
}

export default GetUserData;