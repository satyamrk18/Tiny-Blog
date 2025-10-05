import { useState, useEffect } from "react";
import { useParams } from "react-router";
import SimpleMDE from "react-simplemde-editor";
import axios from "axios";
const ReadBlog = () => {
  const [blog, setBlog] = useState("");

  const { slug } = useParams();

  const loadBlog = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/blog/${slug}`
    );
    setBlog(response.data.data);
  };
  useEffect(()=>{loadBlog()},[],)
  return (
    <div>
      <h1>{blog.title}</h1>
    </div>
  );
};
export default ReadBlog;
