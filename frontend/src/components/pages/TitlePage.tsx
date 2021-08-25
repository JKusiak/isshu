import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FC, useContext } from "react";
import { DarkModeContext } from '../../App';
import TextLogo from '../../resources/logo/logo_text.svg';
import DarkTextLogo from '../../resources/logo/logo_text_darkmode.svg';
import ToProjectsButton from "../buttons/ToProjectsButton";
import RegisterModal from "../modals/RegisterModal";


interface TitlePageProps {
      loggedIn: boolean,
      setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
      textLogo: {
            width: '35%',
            height: '35%'
      },
}));

const TitlePage: FC<TitlePageProps> = (props) => {
      const classes = useStyles();
      const {darkMode} = useContext(DarkModeContext);

      
      return (
      <Box mt={"6em"}>
            <Grid container direction="column" justify="center" alignItems="center">
                  <img 
                        className={classes.textLogo} 
                        src={darkMode? DarkTextLogo : TextLogo} 
                        alt='logo of the website saying "Isshu - minimalistic bug tracker"'>
                  </img>
                  {!props.loggedIn &&
                        <> 
                        <RegisterModal/>
                        </>
                  }
                  {props.loggedIn &&
                        <ToProjectsButton/>
                  }
            </Grid>
      </Box>
      );
}

export default TitlePage;