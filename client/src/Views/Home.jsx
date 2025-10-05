import Navbar from "../Components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../Components/BlogCard";
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchblog = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/blogs`
    );
    setBlogs(response.data.data);
  };

  useEffect(() => {
    fetchblog();
  }, []);
  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className="flex flex-row w-[100%] items-center justify-evenly">
        {/* search  */}
        <div className="border-2 w-[20%] p-10"></div>

        {/* blogs */}

        <div className="w-[60%] h-full border-2 flex flex-wrap items-start justify-evenly">
          <h2>trending</h2>
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
                publish_at={createdAt}
                slug={slug}
              />
            </div>
          );}
        })}
      </div>
      </div>
    </div>
  );
};
export default Home;
