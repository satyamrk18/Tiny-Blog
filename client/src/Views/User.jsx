import { useState, useEffect } from "react";
import Navbar from "./../Components/Navbar.jsx";
import { getCurrentUser } from "../Util.js";
import { useParams } from "react-router";
import axios from "axios";
const User = () => {

const [user, setUser] = useState(null);
useEffect(()=>{setUser(getCurrentUser)},[]);

const userData = async ()=>
{
  
}

  return (
    <div>
      <Navbar />
      <h1>{user?.name}</h1>
    </div>
  );
};
export default User;
