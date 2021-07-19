import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC } from "react"
import GetProjectsList from "../functional/GetProjectsList";
import GetLoggedUserData from "../functional/GetLoggedUserData";


const useStyles = makeStyles((theme: Theme) => createStyles({
      root: {
            display: 'grid',
            placeItems: 'center'
      },
}));

interface LoggedUserPageProps {

}

const UserPage: FC<LoggedUserPageProps> = (props) => {
      const classes = useStyles();

      return (
      <div className={classes.root}> 
            <div>
                  <GetLoggedUserData/>
            </div>  
            
            <GetProjectsList/>
      </div>
      );
}

export default UserPage;