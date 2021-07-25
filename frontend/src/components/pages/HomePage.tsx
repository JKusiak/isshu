import { FC } from "react";
import logoText from '../../resources/logo/isshu_logo_text.svg';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import RegisterModal from "../modals/RegisterModal";
import ButtonToProjects from "../ButtonToProjects";


interface HomePageProps {
      loggedIn: boolean,
      setLoggedIn: any
}

const useStyles = makeStyles((theme: Theme) => createStyles({
      bigLogo: {
            width: '35%',
            height: '35%'
      },
}));

const HomePage: FC<HomePageProps> = (props) => {
      const classes = useStyles();

      return (
      <Box mt={"6em"}>
            <Grid container direction="column" justify="center" alignItems="center">
                  <img 
                        className={classes.bigLogo} 
                        src={logoText} 
                        alt='logo of the website saying "Isshu - minimalistic bug tracker"'>
                  </img>
                  {!props.loggedIn &&
                        <> 
                        <RegisterModal/>
                        </>
                  }
                  {props.loggedIn &&
                        <ButtonToProjects/>
                  }
            </Grid>
      </Box>
      );
}

export default HomePage;