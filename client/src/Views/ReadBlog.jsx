import { useState, useEffect } from "react";
import { useParams } from "react-router";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";

const ReadBlog = () => {
  const [blog, setBlog] = useState({});
  const [author, setAuthor] = useState({})
  const { slug } = useParams();
  //read the perticular blog
  const loadBlog = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/blog/${slug}`
    );
    setBlog(response.data.data);
  };


  //geting the author of the blog
  const loadAuthor = async (authorId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/userBlog/${authorId}`
      );
      setAuthor(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      console.error("Error loading author:", err);
    }
  };


  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    loadBlog();
  }, [slug]);


  useEffect(() => {
    if (blog?.author?._id) {
      loadAuthor(blog.author._id);
    }
  }, [blog]);
  return (
    <div className=" w-full  mt-10 flex justify-evenly">
      <div className="">
        <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>
        <MDEditor.Markdown
          source={blog.content}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>
      <div className="border-1 p-5 h-fit ">
        <h1>hello world</h1>
      </div>
    </div>
  );
};

export default ReadBlog;
