import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC } from "react"
import GetProjectsList from "../functional/GetProjectsList";
import GetUserData from "../functional/GetUserData";


const useStyles = makeStyles((theme: Theme) => createStyles({
      root: {
            display: 'grid',
            placeItems: 'center'
      },
}));

interface UserPageProps {

}

const UserPage: FC<UserPageProps> = (props) => {
      const classes = useStyles();

      return (
      <div className={classes.root}> 
            <div>
                  <GetUserData/>
            </div>  
            
            <GetProjectsList/>
      </div>
      );
}

export default UserPage;