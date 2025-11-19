import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import Navbar from "./../Components/Navbar.jsx";
import axios from "axios";
import { getCurrentUser } from "./../Util.js";
import BLOG_CATEGORIES from "./../constants.js";

const NewBlog = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [thumbnail, setThumbnail] = useState([]);
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [status, setStatus] = useState("draft");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    document.documentElement.setAttribute("data-color-mode", "light");
  }, []);

  const saveBlog = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/addblogs`,
        {
          title,
          subtitle,
          thumbnail,
          content,
          category,
          status,
          author: user?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response?.data?.success === true) {
        alert(response.data.message);
        setTitle("");
        setCategory(BLOG_CATEGORIES[0]);
        setContent("");
        setSubtitle("");
        setThumbnail([]);
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-8 mt-10 bg-white shadow-xl rounded-2xl">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Create New Blog
        </h1>

        {/* Blog Title */}
        <label className="font-semibold text-gray-700">Blog Title</label>
        <input
          type="text"
          placeholder="Enter blog title"
          className="border p-3 rounded-xl w-full mb-5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Subtitle */}
        <label className="font-semibold text-gray-700">Blog Subtitle</label>
        <input
          type="text"
          placeholder="Enter subtitle"
          className="border p-3 rounded-xl w-full mb-5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />

        {/* Thumbnail */}
        <label className="font-semibold text-gray-700">Thumbnail Image URL</label>
        <input
          type="text"
          placeholder="Enter thumbnail link"
          className="border p-3 rounded-xl w-full mb-5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={thumbnail}
          onChange={(e) => setThumbnail([e.target.value])}
        />

        {/* Category + Status */}
        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          <div className="flex-1">
            <label className="font-semibold text-gray-700">Category</label>
            <select
              className="border p-3 rounded-xl w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-1"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {BLOG_CATEGORIES.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="font-semibold text-gray-700">Status</label>
            <select
              className="border p-3 rounded-xl w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-1"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Markdown Editor */}
        <label className="font-semibold text-gray-700">Blog Content</label>
        <div className="border rounded-xl overflow-hidden shadow-sm mb-6 bg-white">
          <MDEditor
            value={content}
            onChange={setContent}
            className="min-h-[350px]"
          />
        </div>

        {/* Save Button */}
        <button
          type="button"
          className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all"
          onClick={saveBlog}
        >
          Save Blog
        </button>
      </div>
    </div>
  );
};

export default NewBlog;
