import { FC } from "react";

interface PersonalDataProps {
      credentials: any;
}

const PersonalData: FC<PersonalDataProps> = (props) => {
     
      return(
            <>
                  <h3>Name: {props.credentials.name}</h3>
                  <h3>Surname: {props.credentials.surname}</h3>
                  <h3>Email: {props.credentials.email}</h3>  
            </>
      );
}

export default PersonalData;