import Navbar from "../Components/Navbar";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const saveUser = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/signup`,
        user
      );
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response.data.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-md mx-auto mt-16 bg-white shadow-lg rounded-2xl p-8 border">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Sign Up
        </h1>

        {/* Username */}
        <label className="font-semibold">Username</label>
        <input
          type="text"
          placeholder="Enter username"
          className="border p-3 rounded-xl w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          autoComplete="username"
          required
        />

        {/* Email */}
        <label className="font-semibold">Email</label>
        <input
          type="email"
          placeholder="Enter email"
          className="border p-3 rounded-xl w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          autoComplete="email"
          required
        />

        {/* Password */}
        <label className="font-semibold">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            autoComplete="new-password"
            required
          />

          {/* Show/Hide Password Button */}
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-black"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Sign Up Button */}
        <button
          type="button"
          className="mt-6 bg-blue-600 text-white p-3 rounded-xl w-full text-lg font-semibold hover:bg-blue-700 transition"
          onClick={saveUser}
        >
          Sign Up
        </button>

        {/* Bottom Link */}
        <p className="text-sm text-center mt-4 text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-medium">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
