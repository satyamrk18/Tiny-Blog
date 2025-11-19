import { Link } from "react-router";
import { useState, useEffect } from "react";
import { getCurrentUser } from "./../Util";

const Navbar = () => {
  const [user, setUser] = useState(null);
  useEffect(() => setUser(getCurrentUser()), []);

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo / Brand */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
        >
          BlogApp
        </Link>

        {/* Middle Links */}
        <div className="hidden md:flex gap-8 text-lg font-medium">
          <Link
            to="/"
            className="hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/allblogs"
            className="hover:text-blue-600 transition"
          >
            All Blogs
          </Link>

          <Link
            to="/newblog"
            className="hover:text-blue-600 transition"
          >
            New Blog
          </Link>
        </div>

        {/* Right: User / Auth */}
        <div className="flex items-center gap-4">
          {user ? (
            <Link
              to={`/user/${user.name}/${user._id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {user.name}
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
              >
                Log In
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
