import { FC } from "react"
import { Link } from "react-router-dom";

interface NavbarProps {

}

const Navbar: FC<NavbarProps> = (props) => {
      
      return (
      <>
            <Link to="/users">Users</Link>
            <Link to="/">Home</Link>
      </>
      );
}

export default Navbar;