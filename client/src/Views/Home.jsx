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
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-row w-[100%] items-center justify-evenly mt-10">
        {/* search  */}
        <div className="border-2 w-[20%] p-10"></div>

        {/* blogs */}

        <div className="w-[50%]">
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

      {/* recomended topics */}
      <div className="w-[10%] border-2 h-[50vh]">

      </div>
      </div>
    </div>
  );
};
export default Home;
