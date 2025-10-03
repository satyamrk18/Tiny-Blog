const BlogCard = ({ _id, author, title, category, content, publish_at }) => {
  return (
    <div className="border-2 m-5 p-3">
      <h2>{title}</h2>
      <h3><span className="text-3xl border-1 rounded-full">{author?.name.substring(0, 1)}  </span>{author?.name}</h3>
      <h4>{category}</h4>
      <p>{content}</p>
      <h5>{publish_at}</h5>
    </div>
  );
};
export default BlogCard;
