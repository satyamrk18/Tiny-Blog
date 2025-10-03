import { Link } from "react-router";
const BlogCard = ({ _id, author, title, category, content, publish_at,slug }) => {
  return (
    <div
      className="border-2 m-auto my-5 p-3 w-[50%] flex flex-col items-start"
      key={_id}
    >
      <h3 className="">
        <span className="text-3xl rounded-full">
          {author?.name.substring(0, 1)}{" "}
        </span>
        {author?.name}
      </h3>
      <Link to={`/blog/${slug}`}><h2>{title}</h2></Link>
      <h4>{category}</h4>
      <p>{content}</p>
      <p className="border-2 rounded-xl p-1 text-sm bg-gray-50 ">
        {publish_at.split("T")[0]}
      </p>
    </div>
  );
};
export default BlogCard;
