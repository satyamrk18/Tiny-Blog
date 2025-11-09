import { json } from "express";
import Blog from "./../models/Blog.js";
import User from "./../models/User.js";
import jwt from "jsonwebtoken";
//adding the blog
const postblogs = async (req, res) => {
  const { title, subtitle, thumbnail, category, content, status } = req.body;
  const { authorization } = req.headers;
  let decodedToken;
  try {
    decodedToken = jwt.verify(
      authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
  } catch (err) {
    return res.status(401).json({ message: "invalied token" });
  }
  console.log(decodedToken);

  //in author we recieves the object ID
  //status = false
  if (!title || !category || !content || !thumbnail) {
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
    author: decodedToken.id,
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

//fetch pertucular blog from slug

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
const patchUpdateStatus = async (req, res) => {
  try {
    const { slug } = req.params;
    const { newStatus } = req.body;
    const publishedBlog = await Blog.findOneAndUpdate(
      { slug: slug },
      { status: newStatus }
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

//geting the blog author
const getAuthor = async (req, res) => {
  const { authorid } = req.params;
  const author = await User.findOne({ _id: authorid });
  if (author) {
    res.json({
      success: true,
      data: author,
      message: "author find successfully",
    });
  } else {
    res.json({
      success: false,
      message: "author not found.",
    });
  }
};

//edit a blg
const putEditBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, subtitle, thumbnail, category, content, status } = req.body;
    const blog = await Blog.findOneAndUpdate(
      { slug: slug },
      {
        title: title,
        subtitle: subtitle,
        thumbnail: thumbnail,
        category: category,
        content: content,
        status: status,
      },
      {new:true}
    );
    if (blog) {
      res.status(201).json({
        success: true,
        data: blog,
        message: "Blog updated successfully !",
      });
    } else {
      req.status(401).json({
        success: false,
        message: "invalid data",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error, please try again latter",
    });
  }
};

export {
  postblogs,
  getBlog,
  getPerticularBlog,
  patchUpdateStatus,
  getAuthor,
  putEditBlog,
};
