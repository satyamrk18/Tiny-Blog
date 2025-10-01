import { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css"; // ✅ important for styles

const NewBlog = () => {
  const [value, setValue] = useState("");

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold mb-4">New Blog</h1>
      <div className="max-w-3xl mx-auto">
        <SimpleMDE value={value} onChange={setValue} />
      </div>
    </div>
  );
};

export default NewBlog;
