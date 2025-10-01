import { useState, useSyncExternalStore } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css"; // ✅ important for styles
import BlogCategory from "./../constants.js";

const NewBlog = () => {
  const [content, setContent] = useState("");
  const [Title, setTitle] = useState("");
  const [category, setcategory] = useState(BlogCategory[0]);
  return (
    <div className="w-full my-10 flex items-center flex-col justify-center gap-10">
      <h1>New Blog</h1>
        {/* title input */}
        <input
          type="text"
          placeholder="Blog Title"
          className="border-1 p-2 rounded-xl ml-5 w-[90%]"
          value={Title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      {/* choose cahtegory */}
      <div>
        category 
        <select
          className="border-1 p-2 rounded-xl ml-5"
          value={category}
          onChange={(e) => {
            setcategory(e.target.value);
          }}
        >
          {BlogCategory.map((cate) => {
            return (
              <option key={cate} value={cate}>
                {cate}
              </option>
            );
          })}
        </select>
      </div>
      <SimpleMDE
        onChange={(value) => {
          setContent(value);
          console.log(value);
        }}
        className="w-[90%] h-auto min-h-[400px]"
      />
      <button type="button" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Save Blog</button>
    </div>
  );
};

export default NewBlog;
