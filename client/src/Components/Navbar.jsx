import { Link } from "react-router";
import { useState, useEffect } from "react";
import { getCurrentUser } from "./../Util";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => setUser(getCurrentUser()), []);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
        >
          BlogApp
        </Link>

        {/* Hamburger - Mobile */}
        <button
          className="md:hidden text-3xl text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-lg font-medium">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/allblogs" className="hover:text-blue-600 transition">All Blogs</Link>
          <Link to="/newblog" className="hover:text-blue-600 transition">New Blog</Link>
        </div>

        {/* Desktop User Section */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Link
              to={`/user/${user.name}/${user._id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {user.name}
            </Link>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4 text-lg font-medium">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link
            to="/allblogs"
            onClick={() => setOpen(false)}
            className="block hover:text-blue-600 transition"
          >
            All Blogs
          </Link>
          <Link
            to="/newblog"
            onClick={() => setOpen(false)}
            className="block hover:text-blue-600 transition"
          >
            New Blog
          </Link>

          {user ? (
            <Link
              to={`/user/${user.name}/${user._id}`}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 bg-blue-600 text-white rounded-lg text-center"
            >
              {user.name}
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-center"
              >
                Log In
              </Link>

              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 bg-blue-600 text-white rounded-lg text-center"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
