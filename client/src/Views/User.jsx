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

  // Load user
  const loadUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/user/${name}/${id}`
      );
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

  //published, draft, archive and delete based on click
  const updateBlogStatus = async (slug, newStatus) => {
    await axios.patch(
      `${import.meta.env.VITE_SERVER_URL}/blog/status/${slug}`,
      {
        newStatus: newStatus,
      }
    );
    retrieveBlogs();
  };
  // Filter blogs based on tab
  const filteredBlogs = blogs.filter((b) => b.status === activeTab);

  //edit user

  const saveEdit = async () => {
   try{
     const response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/edit/${name}/${id}`,
      user
    );
    if (response) {
      alert(response.data.message);
      setOpenEdit(false)
    } else {
      alert(response.data.message);
    }
   }
   catch(error)
   {
    alert(error.response.data.message)
   }
  };

  return (
    <div className="flex flex-col relative">
      <Navbar />

      {/* edit profile popup box */}
      {openEdit && (
        <div className="border-2 h-[50vh] rounded-2xl flex flex-col w-[50%] m-auto mt-20 z-[1000] absolute bg-white left-[25%]">
          <span
            onClick={() => setOpenEdit(false)}
            className="absolute right-2 top-2 border-2 p-0.5 rounded-full text-center w-8 bg-red-600 text-white cursor-pointer"
          >
            X
          </span>
          <div className="flex flex-col w-[80%] m-auto gap-10">
            <input
              type="text"
              value={user?.name || ""}
              className="border-1 rounded-l"
              onChange={(e) => {
                setUser({ ...user, name: e.target.value });
              }}
            />
            <input
              type="text"
              value={user?.bio || ""}
              className="border-1 rounded-l"
              onChange={(e) => {
                setUser({ ...user, bio: e.target.value });
              }}
            />
            <textarea
              value={user?.summary || ""}
              className="border-1 rounded-l"
              onChange={(e) => {
                setUser({ ...user, summary: e.target.value });
              }}
            />
          </div>
          <button
            
            onClick={() => {
              saveEdit();
            }}
            className="border-2 w-[75px] m-auto p-1 rounded-xl bg-green-600 cursor-pointer text-white"
          >
            Save
          </button>
        </div>
      )}
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
            <h3>Summary</h3>
            <h4 className="text-gray-600">{user?.summary}</h4>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                setOpenEdit("block");
              }}
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded cursor-pointer hover:bg-blue-600 transition-all"
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
