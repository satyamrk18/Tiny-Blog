import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import BLOG_CATEGORIES from "./../constants.js";
import { useParams } from "react-router";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [status, setStatus] = useState("draft");
  const { slug } = useParams();

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
  }, []);

  // Fetch existing blog
  const getBlog = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/blog/${slug}`
      );
      const data = response.data.data;
      setTitle(data.title || "");
      setSubtitle(data.subtitle || "");
      setThumbnail(data.thumbnail || "");
      setContent(data.content || "");
      setCategory(data.category || BLOG_CATEGORIES[0]);
      setStatus(data.status || "draft");
    } catch (err) {
      alert("Failed to load blog");
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  const UpdateBlog = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/edit/${slug}`,
        { title, subtitle, thumbnail, content, category, status },
        {headers:
          {
            Authorization :`Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      if (response?.data?.success === true) {
        alert(response.data.message);
        window.location.href = "/";
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="w-full my-10 flex items-center flex-col justify-center gap-10">
      <h1>Edit Blog</h1>

      <input
        type="text"
        placeholder="Blog Title"
        className="border p-2 rounded-xl ml-5 w-[90%]"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Blog subtitle"
        className="border p-2 rounded-xl ml-5 w-[90%]"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Thumbnail image link"
        className="border p-2 rounded-xl ml-5 w-[90%]"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
      />

      <div>
        <span>Category:</span>
        <select
          className="border p-2 rounded-xl ml-5"
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
          className="border p-2 rounded-xl ml-5"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="container w-[90%]">
        <MDEditor value={content} onChange={setContent} />
      </div>

      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        onClick={UpdateBlog}
      >
        Update Blog
      </button>
    </div>
  );
};

export default EditBlog;
