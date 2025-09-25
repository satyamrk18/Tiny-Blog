import { Link, useLocation } from "react-router";
const Navbar = () => {
  return (
    <div className="w-full flex flex-row items-center justify-evenly text-xl font-bold">
      <Link to="/">Home</Link>
      <Link to="/login">Log In</Link>
      <Link to="/signin">Sign In</Link>
    </div>
  );
};
export default Navbar;
