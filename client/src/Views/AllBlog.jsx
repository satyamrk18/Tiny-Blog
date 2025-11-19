import { useState, useEffect } from "react";
import { getCurrentUser } from "./../Util.js";
import Navbar from "../Components/Navbar.jsx";
import BlogCard from "./../Components/BlogCard.jsx";
import axios from "axios";

const AllBlog = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const fetchblog = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/blogs`
    );
    setBlogs(response.data.data);
  };

  useEffect(() => {
    setUser(getCurrentUser());
    fetchblog();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          All Blogs
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => {
            const {
              _id,
              title,
              subtitle,
              thumbnail,
              author,
              category,
              content,
              createdAt,
              slug,
              status,
            } = blog;

            if (status === "published") {
              return (
                <div
                  key={_id}
                  className="bg-white shadow-xl rounded-2xl p-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  <BlogCard
                    _id={_id}
                    title={title}
                    subtitle={subtitle}
                    thumbnail={thumbnail}
                    author={author}
                    category={category}
                    content={content}
                    publish_at={createdAt}
                    slug={slug}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default AllBlog;
