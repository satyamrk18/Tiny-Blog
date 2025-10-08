import { json } from "express";
import Blog from "./../models/Blog.js";

//adding the blog
const postblogs = async (req, res) => {
  const { title, subtitle, thumbnail, category, content, author, status } =
    req.body;
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
  }`.replace(/[^\w-]+/g, ""); //regex to generate slug
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
  const blogs = await Blog.find()
    .populate("author", "_id name email")
    .sort({ createdAt: -1 });
  //populate describe entrie data of referense id ans sort for recent blogs get up side
  res.status(201).json({
    success: true,
    data: blogs,
    message: "Blog featch successfully !",
  });
};

//fetch pertucular blog from lug

const getPerticularBlog = async (req, res) => {
  const { slug } = req.params;

  const response = await Blog.findOne({ slug: slug }).populate(
    "author",
    "_id name email"
  );
  if (!response) {
    res.status(400).json({
      success: false,
      message: "Blog not Found",
    });
  } else {
    res.status(200).json({
      success: true,
      data: response,
      message: "Blog Found successfully !",
    });
  }
};

//draft and archive to published blog
const patchPublishedBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const publishedBlog = await Blog.findOneAndUpdate(
      { slug: slug },
      { status: "published" }
    );
    if (publishedBlog) {
      res.status(200).json({
        success: true,
        data: publishedBlog,
        message: "blog update successfully !",
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Blog not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error.",
    });
  }
};
const patchDraftBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const draftBlog = await Blog.findOneAndUpdate(
      { slug: slug },
      { status: "draft" }
    );
    if (draftBlog) {
      res.status(200).json({
        success: true,
        data: draftBlog,
        message: "Blog Updated successfully !",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Blog not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
export {
  postblogs,
  getBlog,
  getPerticularBlog,
  patchPublishedBlog,
  patchDraftBlog,
};
