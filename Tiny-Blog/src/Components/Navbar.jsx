import { Link, useLocation } from "react-router";
const Navbar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/login">Log In</Link>
      <Link to="/signin">Sign In</Link>
    </div>
  );
};
export default Navbar;
