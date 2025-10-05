import Blog from "./../models/Blog.js";

//adding the blog
const postblogs = async (req, res) => {
  const { title, subtitle, thumbnail,category, content, author,status } = req.body;
  //in author we recieves the object ID
  //status = false
  if (!title || !category || !content || !author || !thumbnail) {
    return res.status(401).json({
      success: false,
      message: "all fields are required",
    });
  }
  //status = true
  const newBlog = new Blog({
    title,
    subtitle,
    thumbnail,
    category,
    content,
    author,
    status,
    slug: `temp-slug ${Date.now()}-${Math.random().toString()}`, //temp slug for 1st saving the slug
  });
  const saveBlog = await newBlog.save();
  saveBlog.slug = `${title.toLowerCase().replace(/ /g, "-")}-${
    saveBlog._id
  }`.replace(/[^\w-]/, "");
  await saveBlog.save();
  console.log(saveBlog.slug); //slug generate successfully
  res.status(201).json({
    success: true,
    blog: saveBlog,
    message: "Blog Created Successfully",
  });
};

//featching the blogs
const getBlog = async (req, res) => {
  const blogs = await Blog.find().populate("author", "_id name email").sort({ createdAt: -1 });
     //populate describe entrie data of referense id ans sort for recent blogs get up side
  res.status(201).json({
    success: true,
    data: blogs,
    message: "Blog featch successfully !",
  });
};
export { postblogs, getBlog };
