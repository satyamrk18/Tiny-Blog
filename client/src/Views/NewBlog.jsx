import { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css"; // ✅ important for styles

const NewBlog = () => {
  const [content, setContent] = useState("");

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold mb-4">New Blog</h1>
      <div className="max-w-3xl mx-auto">
        <SimpleMDE
          onChange={(value) => {
            setContent(value);
            console.log(value);
          }}
        />
      </div>
    </div>
  );
};

export default NewBlog;
