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
      className="border-1 rounded-2xl m-auto my-5 p-3 w-[90%] flex flex-row items-center justify-between"
      key={_id}
    >
      <div className="flex flex-col">
        <h3 className="">
        <span className="text-3xl rounded-full">
          {author?.name.substring(0, 1)}{" "}
        </span>
        {author?.name}
      </h3>
      <Link to={`/blog/${slug}`}>
        <h2>{title}</h2>
      </Link>
      <p>{subtitle}</p>
      <h4>{category}</h4>
      <p>{content}</p>
      <p className="border-2 rounded-xl p-1 text-sm bg-gray-50 ">
        {publish_at.split("T")[0]}
      </p>
      </div>

      <div>
          {thumbnail[0] ? <img src={thumbnail[0]} alt="thumbnail-img" className="" /> : ""}
      </div>
    </div>
  );
};
export default BlogCard;
