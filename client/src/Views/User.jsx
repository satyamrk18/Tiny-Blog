import { useState, useEffect } from "react";
import Navbar from "./../Components/Navbar.jsx";
import { getCurrentUser } from "../Util.js";
import { useParams } from "react-router";
import axios from "axios";
import BlogCard from "../Components/BlogCard.jsx";

const User = () => {
  const [loggedinuser, setLoggedinUser] = useState(null);
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState("published");

  const tabs = ["published", "draft", "archived"];
  const { name, id } = useParams();

  // Load user
  const loadUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/${name}/${id}`);
      setUser(res.data.data);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  // Retrieve blogs
  const retrieveBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/blogs`);
      const allBlogs = res.data.data;
      const userBlogs = allBlogs.filter((b) => b.author._id === id);
      setBlogs(userBlogs);
    } catch (error) {
      console.error("Error retrieving blogs:", error);
    }
  };

  useEffect(() => {
    setLoggedinUser(getCurrentUser());
    loadUser();
    retrieveBlogs();
  }, []);

  // Filter blogs based on tab
  const filteredBlogs = blogs.filter((b) => b.status === activeTab);

  return (
    <div className="flex flex-col">
      <Navbar />

      {/* User Info Section */}
      <div className="flex flex-col mt-10 w-[70%] border m-auto gap-10 p-6 rounded-xl bg-white shadow-sm">
        <div className="flex flex-row items-center justify-evenly flex-wrap">
          <img
            src={user?.profilepic}
            alt="user profile"
            className="rounded-full w-32 h-32 object-cover"
          />
          <div className="text-start">
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <h3 className="text-gray-600">{user?.bio}</h3>
          </div>
          <div>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 transition-all"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-col m-auto w-[70%] mt-10">
        <div className="flex justify-center flex-wrap gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`border px-4 py-2 rounded-md capitalize transition-all ${
                activeTab === tab
                  ? "bg-blue-500 text-white border-blue-500"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Blogs Section */}
        <div className="m-auto flex w-[70%] flex-col gap-5 mt-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map(
              ({
                _id,
                title,
                subtitle,
                thumbnail,
                author,
                category,
                createdAt,
                slug,
                status,
              }) => (
                <div className="border rounded-lg" key={_id}>
                  <BlogCard
                    _id={_id}
                    title={title}
                    subtitle={subtitle}
                    thumbnail={thumbnail}
                    author={author}
                    category={category}
                    publish_at={createdAt}
                    status={status}
                    slug={slug}
                  />
                </div>
              )
            )
          ) : (
            <h2 className="text-center text-gray-500 mt-10">
              No {activeTab} blogs found.
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
