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
    <Link to={`/blog/${slug}`} key={_id} className="block">
      <article className="group flex gap-6 py-8 border-border transition-all duration-200 hover:opacity-70 cursor-pointer bg-white">
        {/* Content Section - Left Side */}
        <div className="flex-1 flex flex-col justify-between gap-3">
          {/* Author Info */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-5 w-5 rounded-full bg-blog-category-bg text-xs font-medium text-blog-meta">
              {author?.name?.substring(0, 1).toUpperCase()}
            </div>
            <span className="text-sm text-blog-meta font-normal">
              {author?.name}
            </span>
          </div>

          {/* Title and Subtitle */}
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-xl md:text-[22px] text-blog-title leading-tight line-clamp-2">
              {title}
            </h2>
            <p className="text-sm text-[#6B6B6B] md:text-base text-blog-subtitle line-clamp-2 leading-relaxed hidden md:block">
              {subtitle}
            </p>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-3 text-xs text-blog-meta">
            <span className="px-3 py-1 bg-blog-category-bg text-blog-category-text rounded-full font-normal">
              {category}
            </span>
            <span className="font-normal">
              {new Date(publish_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Thumbnail - Right Side */}
        {thumbnail && thumbnail[0] && (
          <div className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40">
            <img
              src={thumbnail[0]}
              alt={title}
              className="w-full h-full object-cover rounded"
            />
          </div>
        )}
      </article>
    </Link>
  );
};

export default BlogCard;
