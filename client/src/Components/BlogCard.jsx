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
      className="border-1 rounded-2xl m-auto my-5 p-3 w-3xs flex flex-col items-start justify-between"
      key={_id}
    >
       <p className="">
        <span className="text-3xl rounded-full">
          {author?.name.substring(0, 1)}{" "}
        </span>
        {author?.name}
      </p>
        <div>
          {thumbnail[0] ? <img src={thumbnail[0]} alt="thumbnail-img" className="w-screen h-[150px]" /> : ""}
      </div>
      <div className="flex flex-col">
      <Link to={`/blog/${slug}`}>
        <p className="font-bold text-xl">{title}</p>
      </Link>
      <p className="text-lg">{subtitle}</p>
      <h4>{category}</h4>
      <p>{content}</p>
      <p className="border-2 rounded-xl p-1 text-sm bg-gray-50 ">
        {publish_at.split("T")[0]}
      </p>
      </div>
    </div>
  );
};
export default BlogCard;
