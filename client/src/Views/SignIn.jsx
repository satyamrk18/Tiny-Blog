import Navbar from "../Components/Navbar";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";


const SignIn = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const saveUser = async () => {
   try{
    const response = await axios.post(`http://localhost:8080/signup`,user);
    alert(response.data.message);
   }
   catch (error) {
  if (error.response) {
    alert(error.response.data.message || "Something went wrong!");
  } else {
    alert(error.message);
  }
}

  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">Sign up</h1>
      <Navbar />
      <form className="w-80 p-6 m-auto mt-6 flex flex-col gap-5 border-2 rounded-2xl">
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          className="border p-2 rounded-xl w-full"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          autoComplete="username"
          required
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          className="border p-2 rounded-xl w-full"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          autoComplete="email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          className="border p-2 rounded-xl w-full"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          autoComplete="current-password"
          required
        />

        <button
          type="button"
          className="m-auto border-2 p-2 rounded-2xl w-full cursor-pointer"
          onClick={() => {
            saveUser();
          }}
        >
          Sign up
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
