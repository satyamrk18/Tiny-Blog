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
    <div className="text-center mt-5">
      <Navbar />
      <div>
        {blogs.map((blog) => {
          const { _id, title, subtitle, thumbnail, author, category, content, createdAt, slug, status } = blog;
          if(status == "published"){
          return (
            <div key={_id}>
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
          );}
        })}
      </div>
    </div>
  );
};
export default AllBlog;
