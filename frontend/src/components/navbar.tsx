import { FC } from "react"
import { Link } from "react-router-dom";

interface NavbarProps {

}

const Navbar: FC<NavbarProps> = (props) => {
      
      return (
      <>
            <Link to="/home">Home</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/profile">Profile</Link>
      </>
      );
}

export default Navbar;