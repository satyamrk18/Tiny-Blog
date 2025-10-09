import { Link } from "react-router";
import { SquarePen, BookCheck, ArchiveRestore } from "lucide-react";
const BlogCard = ({
  _id,
  author,
  title,
  subtitle,
  status,
  thumbnail,
  category,
  content,
  publish_at,
  slug,
  onClick,
}) => {
  const health = [
    "Health",
    "Fitness",
    "Nutrition",
    "Mental Health",
    "Lifestyle",
    "Food",
    "Cooking",
  ];
  const tech = [
    "Technology",
    "Programming",
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Artificial Intelligence",
    "Machine Learning",
    "Cybersecurity",
    "Cloud Computing",
    "DevOps",
    "Software Engineering",
    "UI/UX Design",
  ];
  const education = [
    "Productivity",
    "Education",
    "Career Development",
    "Business",
    "Startups",
    "Entrepreneurship",
    "Marketing",
    "Finance",
    "Investing",
    "Cryptocurrency",
    "E-commerce",
  ];
  const sport = [
    "Travel",
    "Fashion",
    "Beauty",
    "Personal Development",
    "Motivation",
    "Self Improvement",
    "Photography",
    "Art",
    "Music",
    "Movies",
    "Books",
    "Gaming",
    "Sports",
    "Science",
    "Environment",
  ];
  const other = [
    "Politics",
    "News",
    "Parenting",
    "Relationships",
    "Spirituality",
    "History",
    "Culture",
    "Other",
  ];

  return (
    <Link to={`/blog/${slug}`} key={_id} className="block">
      <article className="group flex gap-6 py-8 border-border transition-all duration-200 hover:shadow-md cursor-pointer bg-white">
        {/* Content Section - Left Side */}
        <div className="flex-1 flex flex-col justify-between gap-3">
          {/* Author Info */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center bg-gray-100 h-5 w-5 rounded-full bg-blog-category-bg text-xs font-medium text-blog-meta">
              {author?.name?.substring(0, 1).toUpperCase()}
            </div>
            <span className="text-sm text-blog-meta font-normal bg-gray-100">
              {author?.name}
            </span>
            <div
              // styling based on color
              className={
                status == "published"
                  ? "bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm font-medium"
                  : status == "draft"
                  ? "bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded text-sm font-medium"
                  : "bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-sm font-medium"
              }
            >
              {/* status show */}
              {status == "published" ? (
                <div className="flex items-center gap-1">
                  <BookCheck size={18} />
                  {status}
                </div>
              ) : status == "draft" ? (
                <div className="flex items-center gap-1">
                  <SquarePen size={18} />
                  {status}
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <ArchiveRestore size={18} />
                  {status}
                </div>
              )}
            </div>
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
            <span className="px-3 py-1 bg-gray-100 bg-blog-category-bg text-blog-category-text rounded-full font-normal">
              {health.includes(category)
                ? `🍎${category}`
                : tech.includes(category)
                ? `🖥${category}`
                : education.includes(category)
                ? `📈${category}`
                : sport.includes(category)
                ? `🚀${category}`
                : other.includes(category)
                ? `🎯${category}`
                : { category }}
            </span>
            <span className="font-normal bg-gray-100">
              🗓
              {new Date(publish_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
{status === "published" ? (
  <div className="flex gap-5">
    <button className="bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded text-sm font-medium cursor-pointer">Draft</button>
    <button className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-sm font-medium cursor-pointer">Archive</button>
  </div>
) : status === "draft" ? (
  <div className="flex gap-5">
    <button className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm font-medium cursor-pointer">Publish</button>
    <button className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-sm font-medium cursor-pointer">Archive</button>
  </div>
) : status === "archived" ? (
  <div className="flex gap-5">
    <button className="bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded text-sm font-medium cursor-pointer">Draft</button>
    <button className="bg-red-500 text-white px-2 py-0.5 rounded text-sm font-mediumd cursor-pointer">Delete</button>
  </div>
) : null}

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
