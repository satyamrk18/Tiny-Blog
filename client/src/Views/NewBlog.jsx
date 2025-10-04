import { useState, useEffect } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css"; // ✅ important for styles
import Navbar from "./../Components/Navbar.jsx";
import axios from "axios";
import { getCurrentUser } from "./../Util.js";
import BLOG_CATEGORIES from "./../constants.js";
const NewBlog = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [thumbnail, settTumbnail] = useState([]);
  const [category, setcategory] = useState(BLOG_CATEGORIES[0]);
  const [user, setUser] = useState(null);

useEffect(() => {
  const currentUser = getCurrentUser();
  setUser(currentUser);
  console.log(currentUser?._id);
}, []);


  //blog saving
  const saveBlog = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/addblogs`,
        { title,subtitle,thumbnail, content, category, author: user?._id }
      );
      if (response?.data?.success === true) {
        alert(response.data.message);
        setTitle("");
        setcategory(BLOG_CATEGORIES[0]);
        setContent("");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="w-full my-10 flex items-center flex-col justify-center gap-10">
      <Navbar />
      <h1>New Blog</h1>
      {/* title input */}
      <input
        type="text"
        placeholder="Blog Title"
        className="border-1 p-2 rounded-xl ml-5 w-[90%]"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      {/* subtitle input  */}
      <input
        type="text"
        placeholder="Blog subtitle"
        className="border-1 p-2 rounded-xl ml-5 w-[90%]"
        value={subtitle}
        onChange={(e) => {
          setSubtitle(e.target.value);
        }}
      />
      {/* thubmnail image input */}
      <input
        type="text"
        placeholder="Thumbnail image link"
        className="border-1 p-2 rounded-xl ml-5 w-[90%]"
        value={thumbnail}
        onChange={(e) => {
          settTumbnail([e.target.value]);
        }}
      />
      {/* choose cahtegory */}
      <div>
        category
        <select
          className="border-1 p-2 rounded-xl ml-5"
          value={category}
          onChange={(e) => {
            setcategory(e.target.value);
          }}
        >
          {BLOG_CATEGORIES.map((cate) => {
            return (
              <option key={cate} value={cate}>
                {cate}
              </option>
            );
          })}
        </select>
      </div>
      <SimpleMDE
        onChange={(value) => {
          setContent(value);
          console.log(value);
        }}
        className="w-[90%] h-auto min-h-[400px]"
      />
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        onClick={() => {
          saveBlog();
        }}
      >
        Save Blog
      </button>
    </div>
  );
};

export default NewBlog;
