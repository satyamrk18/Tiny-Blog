import { useState, useEffect } from "react";
import Navbar from "./../Components/Navbar.jsx";
import { getCurrentUser } from "../Util.js";
import axios from "axios";
const User = () => {
  //for getting the user
  const [user, setUser] = useState(null);
  useEffect(setUser(getCurrentUser), []);

  //for getting the user data and Blogs

  const getUserData = async () => {
    const response = await axios.get();
  };

  return (
    <div>
      <Navbar />
      <h1>user</h1>
    </div>
  );
};
export default User;
