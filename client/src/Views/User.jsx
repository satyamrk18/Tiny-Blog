import { useState, useEffect } from "react";
import Navbar from "./../Components/Navbar.jsx";
import { getCurrentUser } from "../Util.js";
import { useParams } from "react-router";
import axios from "axios";
import { use } from "react";
const User = () => {
  const [loggedinuser, setloggedinuser] = useState(null);
  const [user, setUser] = useState({});

  const { name, id } = useParams();
  const loadUser = async () => {
    const userdata = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/user/${name}/${id}`
    );
    setUser(userdata.data.data);
  };
  useEffect(() => {
    setloggedinuser(getCurrentUser), loadUser();
  }, []);
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-col mt-10 w-[90%] border-2 m-auto">
        {/* image name and bio */}
        <div className="flex flex-row items-center justify-evenly flex-wrap">
          <img
            src={user?.profilepic}
            alt="user profile"
            className="rounded-full"
          />
          <div className="text-start">
            <h2>{user?.name}</h2>
            <h3>{user?.bio}</h3>
          </div>
          {/* edit profile button */}
          <div>
            <button type="button" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Edit Profile</button>
          </div>
        </div>
        {/* summary */}
        <div className="m-auto">
          <h4>{user?.summary}</h4>
        </div>
      </div>
    </div>
  );
};
export default User;
