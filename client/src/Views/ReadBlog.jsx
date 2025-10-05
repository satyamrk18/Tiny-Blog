import { useState, useEffect } from "react";
import { useParams } from "react-router";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";

const ReadBlog = () => {
  const [blog, setBlog] = useState({});
  const { slug } = useParams();

  const loadBlog = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/blog/${slug}`
    );
    setBlog(response.data.data);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode","light");
    loadBlog();
  }, [slug]);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>
             <MDEditor.Markdown source={blog.content} style={{ whiteSpace: "pre-wrap" }} />
    </div>
  );
};

export default ReadBlog;
