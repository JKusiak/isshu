import { FC } from "react";
import logoText from '../resources/isshu_logo_text.svg';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import { useTheme } from '@material-ui/core/styles';
import Button from "./ButtonSpacing";


interface HomePageProps {

}



const useStyles = makeStyles(() => ({
      bigLogo: {
            width: '35%',
            height: '35%'
      },
      homePageButton: {
            padding: '0.5em 4em',
            borderRadius: '10px',
            "&:hover": {
                  background: "palette.secondary.dark"
            }
      }
}));



const HomePage: FC<HomePageProps> = (props) => {
      const classes = useStyles();
      // const theme = useTheme();

      return (
      <Box mt={"6em"}>
            <Grid container direction="column" justify="center" alignItems="center">
                  <img 
                        className={classes.bigLogo} 
                        src={logoText} 
                        alt='logo of the website saying "Isshu - minimalistic bug tracker"'>
                  </img>
                  <Button
                        className={classes.homePageButton}
                        variant='contained'
                        color='primary'
                        mt={"5em"}
                        size={'large'}>
                        Login
                  </Button>
                  <Button 
                        className={classes.homePageButton}
                        variant='contained'
                        color='primary'
                        mt={"2em"}
                        size={'large'}>
                        Register
                  </Button>
            </Grid>
      </Box>
      
      );
}

export default HomePage;