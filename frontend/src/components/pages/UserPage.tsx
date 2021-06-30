import { FC } from "react"
import GetProjectsList from "../functional/GetProjectsList";
import GetUserData from "../functional/GetUserData";

interface UserPageProps {

}

const UserPage: FC<UserPageProps> = (props) => {
      
      return (
      <>    
            <GetUserData/>
            <GetProjectsList/>
      </>
      );
}

export default UserPage;