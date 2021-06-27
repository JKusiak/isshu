import { FC } from "react"
import FetchUserData from "./functional/FetchUserData";

interface UserPageProps {

}

const UserPage: FC<UserPageProps> = (props) => {
      
      return (
      <>
           <FetchUserData/>
      </>
      );
}

export default UserPage;