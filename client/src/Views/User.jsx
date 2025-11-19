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
  const [openEdit, setOpenEdit] = useState(false);

  const tabs = ["published", "draft", "archived"];
  const { name, id } = useParams();

  const loadUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/user/${name}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(res.data.data);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  const retrieveBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/blogs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const allBlogs = res.data.data;
      const userBlogs = allBlogs.filter((b) => b.author?._id === id);
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

  const updateBlogStatus = async (slug, newStatus) => {
    await axios.patch(
      `${import.meta.env.VITE_SERVER_URL}/blog/status/${slug}`,
      { newStatus },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    retrieveBlogs();
  };

  const filteredBlogs = blogs.filter((b) => b.status === activeTab);

  const saveEdit = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/edit/${name}/${id}`,
        user
      );
      alert(response.data.message);
      setOpenEdit(false);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* EDIT POPUP */}
      {openEdit && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-md animate-fadeIn">
          {/* Modal Box */}
          <div className="bg-white w-[90%] md:w-[45%] rounded-3xl p-8 shadow-2xl relative animate-scaleIn">
            {/* Close Button */}
            <button
              onClick={() => setOpenEdit(false)}
              className="absolute right-4 top-4 w-9 h-9 flex items-center justify-center 
        cursor-pointer 
        bg-gray-200 hover:bg-red-600 hover:text-white 
        text-gray-700 rounded-full transition-all"
            >
              ✕
            </button>

            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
              Edit Profile
            </h2>

            {/* Input Fields */}
            <div className="flex flex-col gap-5">
              <label>username</label>
              <input
                type="text"
                value={user?.name || ""}
                className="border border-gray-300 focus:border-blue-500 focus:ring-2 
          focus:ring-blue-300 rounded-xl p-3 outline-none transition"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Enter Name"
              />
              <label>Profile Picture URL</label>
              <input
                type="text"
                value={user?.profilepic || ""}
                className="border border-gray-300 focus:border-blue-500 focus:ring-2 
          focus:ring-blue-300 rounded-xl p-3 outline-none transition"
                onChange={(e) =>
                  setUser({ ...user, profilepic: e.target.value })
                }
                placeholder="Enter Bio"
              />
              <label>Bio</label>
              <input
                type="text"
                value={user?.bio || ""}
                className="border border-gray-300 focus:border-blue-500 focus:ring-2 
          focus:ring-blue-300 rounded-xl p-3 outline-none transition"
                onChange={(e) => setUser({ ...user, bio: e.target.value })}
                placeholder="Enter Bio"
              />
              <label>Summary</label>
              <textarea
                value={user?.summary || ""}
                className="border border-gray-300 focus:border-blue-500 focus:ring-2 
          focus:ring-blue-300 rounded-xl p-3 h-32 outline-none transition"
                onChange={(e) => setUser({ ...user, summary: e.target.value })}
                placeholder="Write your summary..."
              />
            </div>

            {/* Save Button */}
            <button
              onClick={saveEdit}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl 
        mt-7 block mx-auto text-lg font-medium
        hover:bg-blue-700 transition-all shadow-md"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* USER PROFILE CARD */}
      <div className="max-w-4xl mx-auto mt-14 p-8 rounded-2xl bg-white shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src={user?.profilepic}
            className="w-40 h-40 rounded-full shadow-md object-cover"
          />

          <div className="flex-1 space-y-2">
            <h2 className="text-3xl font-bold">{user?.name}</h2>
            <p className="text-gray-600 text-lg">{user?.bio}</p>

            <h4 className="text-lg font-semibold mt-4">Summary</h4>
            <p className="text-gray-600">{user?.summary}</p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              className="bg-blue-600 text-white px-5 py-2 cursor-pointer rounded-lg hover:bg-blue-700"
              onClick={() => setOpenEdit(true)}
            >
              Edit Profile
            </button>

            <button
              className="bg-red-500 text-white px-5 cursor-pointer py-2 rounded-lg hover:bg-red-600"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("loggedinuser");
                window.location.href = "/";
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-4xl mx-auto mt-10">
        <div className="flex justify-center gap-4 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg capitalize text-lg transition-all shadow-sm cursor-pointer
                ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 border hover:bg-gray-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* BLOG LIST */}
        <div className="mt-10 flex flex-col gap-6">
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
                <div
                  className="bg-white shadow-md p-4 rounded-xl hover:shadow-lg transition"
                  key={_id}
                >
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
                    P_onClick={() => updateBlogStatus(slug, "published")}
                    D_onClick={() => updateBlogStatus(slug, "draft")}
                    A_onClick={() => updateBlogStatus(slug, "archived")}
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
