import { useState, useEffect } from "react";
import Navbar from "./../Components/Navbar.jsx";
import { getCurrentUser } from "../Util.js";
import { useParams } from "react-router";
import axios from "axios";
import BlogCard from "../Components/BlogCard";
const User = () => {
  const [loggedinuser, setloggedinuser] = useState(null);
  const [user, setUser] = useState({});
  const [blog, setBlog] = useState([]);
  //load user
  const { name, id } = useParams();
  const loadUser = async () => {
    const userdata = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/user/${name}/${id}`
    );
    setUser(userdata.data.data);
  };

  //retrive blogs
  const retriveBlog = async () => {
    const blog = await axios.get(`${import.meta.env.VITE_SERVER_URL}/blogs`);
    const allBlogs = blog.data.data;
    const userBlog = allBlogs.filter((user) => user.author._id === id);
    setBlog(userBlog);
  };
  useEffect(() => {
    setloggedinuser(getCurrentUser), loadUser(), retriveBlog();
  }, []);
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-col mt-10 w-[90%] border-1 m-auto gap-10">
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
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
            >
              Edit Profile
            </button>
          </div>
        </div>
        {/* summary */}
        <div className="m-auto"></div>
      </div>

      {/* retive blogs */}
      <div className="m-auto flex w-[90%] flex-col gap-5 mt-5">
        {blog.map((blogOBJ) => {
           const { _id, title, subtitle, thumbnail, author, category, content, createdAt, slug, status } = blogOBJ;
          return (
            <div className="border-1" key={_id}>
               <BlogCard
                _id={_id}
                title={title}
                subtitle={subtitle}
                thumbnail={thumbnail}
                author={author}
                category={category}
                publish_at={createdAt}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default User;
