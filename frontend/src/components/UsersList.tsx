import { FC } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
  
      }
));


interface UsersListProps {
      users: any,
}


const UsersList: FC<UsersListProps> = (props) => {
     

      function displayUsers() {
            if(props.users.length > 0) {
                  return(props.users.map((user: any, index: any) => {
                        return(
                              <>
                              <div>{user.name} {user.surname}</div>
                              </>                                 
                        );
                  }));
            } else {
                  return (
                        <h3>No projects yet</h3>
                  );
            }
      }

      return (
            <>
            {displayUsers()}
            </>
      );
}

export default UsersList;