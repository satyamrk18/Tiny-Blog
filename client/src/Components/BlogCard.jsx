import { Link } from "react-router";
const BlogCard = ({
  _id,
  author,
  title,
  subtitle,
  thumbnail,
  category,
  content,
  publish_at,
  slug,
}) => {
  return (
    <div
      className="bg-white rounded-2xl m-auto my-5 w-3xs flex flex-col items-start justify-between "
      key={_id}
    >
        <div>
          {thumbnail[0] ? <img src={thumbnail[0]} alt="thumbnail-img" className="w-screen h-[150px] rounded-t-xl" /> : ""}
      </div>
      <p className="pl-2">
        <span className="text-3xl rounded-full">
          {author?.name.substring(0, 1)}{" "}
        </span>
        {author?.name}
      </p>
      <div className="flex flex-col p-2 gap-2">
      <Link to={`/blog/${slug}`}>
        <p className="font-bold text-xl">{title}</p>
      </Link>
      <p className="text-sm text-gray-500">{subtitle}</p>
     <div className="flex items-baseline justify-between">
       <h4>{category}</h4>
      <p className="border-1 rounded-xl w-fit p-1 text-xs bg-gray-50 ">
        {publish_at.split("T")[0]}
      </p>
     </div>
      </div>
    </div>
  );
};
export default BlogCard;
