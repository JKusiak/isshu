import { FC } from "react";
import logoText from '../resources/isshu_logo_text.svg';
import Button from '@material-ui/core/Button';

interface HomePageProps {

}

const HomePage: FC<HomePageProps> = (props) => {
        
      return (
      <>
            <img src={logoText} alt='logo of the website saying "Isshu - minimalistic bug tracker"'></img>
            <Button variant='contained' color='secondary'>
                  123
            </Button>
      </>
      );
}

export default HomePage;