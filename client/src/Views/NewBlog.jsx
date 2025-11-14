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
     document.documentElement.setAttribute("data-color-mode","light");
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
        },{headers:
          {
            Authorization :`Bearer ${localStorage.getItem("token")}`
          }
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
    <div className="w-full my-10 flex items-center flex-col justify-center gap-10">
      <Navbar />
      <h1>New Blog</h1>

      <input
        type="text"
        placeholder="Blog Title"
        className="border-1 p-2 rounded-xl ml-5 w-[90%]"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Blog subtitle"
        className="border-1 p-2 rounded-xl ml-5 w-[90%]"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Thumbnail image link"
        className="border-1 p-2 rounded-xl ml-5 w-[90%]"
        value={thumbnail}
        onChange={(e) => setThumbnail([e.target.value])}
      />

      <div>
        <span>Category:</span>
        <select
          className="border-1 p-2 rounded-xl ml-5"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {BLOG_CATEGORIES.map((cate) => (
            <option key={cate} value={cate}>
              {cate}
            </option>
          ))}
        </select>

        <span className="ml-5">Status:</span>
        <select
          className="border-1 p-2 rounded-xl ml-5"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Markdown editor */}
      <div className="container w-[90%]">
        <MDEditor value={content} onChange={setContent} className="min-h-[400px] h-auto"/>
      </div>

      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        onClick={saveBlog}
      >
        Save Blog
      </button>
    </div>
  );
};

export default NewBlog;
