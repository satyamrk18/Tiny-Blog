import { useState, useEffect } from "react";
import { useParams } from "react-router";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";

const ReadBlog = () => {
  const [blog, setBlog] = useState({});
  const [author, setAuthor] = useState({});
  const { slug } = useParams();

  const loadBlog = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/blog/${slug}`
    );
    setBlog(response.data.data);
  };

  const loadAuthor = async (authorId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/userBlog/${authorId}`
      );
      setAuthor(response.data.data);
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
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">

        {/* Blog Content */}
        <div className="lg:w-3/4 bg-white shadow-xl p-8 rounded-2xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {blog.title}
          </h1>

          <p className="text-gray-600 text-lg mb-6">{blog.subtitle}</p>

          {/* Thumbnail */}
          {blog.thumbnail && blog.thumbnail.length > 0 && (
            <img
              src={blog.thumbnail[0]}
              alt="thumbnail"
              className="rounded-xl w-full object-cover mb-8 shadow-md"
            />
          )}

          {/* Content */}
          <div className="prose max-w-none">
            <MDEditor.Markdown
              source={blog.content}
              style={{
                whiteSpace: "pre-wrap",
                background: "white",
              }}
            />
          </div>
        </div>

        {/* Author Card */}
        <div className="lg:w-1/4">
          <div className="bg-white shadow-xl rounded-2xl p-6 sticky top-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Author
            </h2>

            <img
              src={author?.profilepic}
              className="w-32 h-32 rounded-full mx-auto object-cover shadow-md"
              alt="author"
            />

            <h3 className="text-center text-xl font-semibold mt-4">
              {author?.name}
            </h3>

            <p className="text-center text-gray-600 mt-2 px-4">
              {author.bio || "No bio available."}
            </p>

            <div className="mt-4 text-center text-sm text-gray-500">
              {blog?.createdAt && (
                <p>Published on: {new Date(blog.createdAt).toDateString()}</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReadBlog;
