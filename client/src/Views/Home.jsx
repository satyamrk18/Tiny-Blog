import Navbar from "../Components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../Components/BlogCard";
import { Link } from "react-router";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/blogs`
    );
    const allBlogs = response.data.data;

    // filter published & show only first 5
    const publishedBlogs = allBlogs
      .filter((b) => b.status === "published")
      .slice(0, 9);

    setBlogs(publishedBlogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 mt-10">

        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Latest Published Blogs
        </h1>

        {/* Blog List */}
        <div className="flex flex-col gap-6">
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
            } = blog;

            return (
              <BlogCard
                key={_id}
                _id={_id}
                title={title}
                subtitle={subtitle}
                thumbnail={thumbnail}
                author={author}
                category={category}
                description={content}
                publish_at={createdAt}
                slug={slug}
              />
            );
          })}
        </div>

        {/* See More Button */}
        <div className="flex justify-center mt-8">
          <Link
            to="/allblogs"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all"
          >
            See More Blogs →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
