import Navbar from "../Components/Navbar";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

const LogIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/login`,
        user
      );

      alert(response.data.message);

      if (response?.data?.success === true) {
        localStorage.setItem("loggedinuser", JSON.stringify(response.data.data));
        localStorage.setItem("token", response.data.token);
        window.location.href = "/";
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-md mx-auto mt-16 bg-white shadow-lg rounded-2xl p-8 border">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Log In
        </h1>

        <label className="font-semibold">Email</label>
        <input
          type="email"
          placeholder="Enter email"
          className="border p-3 rounded-xl w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          autoComplete="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />

        <label className="font-semibold">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="current-password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />

          {/* Show / Hide Toggle Button */}
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-black"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="button"
          className="mt-6 bg-blue-600 text-white p-3 rounded-xl w-full text-lg font-semibold hover:bg-blue-700 transition"
          onClick={loginUser}
        >
          Log In
        </button>

        <p className="text-sm text-center mt-4 text-gray-700">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
