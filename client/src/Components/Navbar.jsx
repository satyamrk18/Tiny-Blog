import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { getCurrentUser } from "./../Util";
const Navbar = () => {
  const [user, setUser] = useState(null);
  useEffect(() => setUser(getCurrentUser()), []);
  return (
    <div className="w-full flex flex-row items-center justify-evenly text-xl font-bold">
      <Link to="/">Home</Link>
      <Link to="/allblogs">All Blogs</Link>
      <Link to="/newblog">New Blog</Link>
      {user ? (
        <Link to={`/user/${user._id}`}>{user.name}</Link>
      ) : (
        <div>
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign In</Link>
        </div>
      )}
    </div>
  );
};
export default Navbar;
