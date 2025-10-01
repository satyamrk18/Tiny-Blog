import { useState, useEffect } from "react";
import { getCurrentUser } from "./../Util.js";
const AllBlog = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
   setUser(getCurrentUser());
    
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>all blogs</h1>
      {
        user ? `hello ${user.name}` : "welcome guest"
      }
    </div>
  );
};
export default AllBlog;
