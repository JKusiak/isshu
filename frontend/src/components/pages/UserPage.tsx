import { FC } from "react"
import GetUserData from "../functional/GetUserData";

interface UserPageProps {

}

const UserPage: FC<UserPageProps> = (props) => {
      
      return (
      <>
           <GetUserData/>
      </>
      );
}

export default UserPage;