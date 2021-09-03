import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import GetUserData from "../functional/GetUserData";



const useStyles = makeStyles((theme: Theme) => createStyles({
      root: {
            display: 'grid',
            placeItems: 'center'
      },
}));


const UserPage = () => {
      const classes = useStyles();

      return (
            <div className={classes.root}>
                  <div>
                        <GetUserData />
                  </div>
            </div>
      );
}

export default UserPage;