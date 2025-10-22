//all imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import {
  postsignup,
  postlogin,
  getuser,
  putEditUserProfile,
} from "./controllers/User.js";
import {
  postblogs,
  getBlog,
  getPerticularBlog,
 patchUpdateStatus,
} from "./controllers/Blog.js";
//all midleware
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

//mongoose coonect to mongoDB

const connection = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    if (connect) {
      console.log("Database connect successfully ! 🔌");
    } else {
      console.log("There is a problem while conecting to database");
    }
  } catch (error) {
    console.log("something went wrong", error);
  }
};

//user credentials
//user sign up
app.post("/signup", postsignup);
//user log in
app.post("/login", postlogin);
//getting user
app.get("/user/:name/:id", getuser);
//editprofile
app.put("/edit/:name/:id", putEditUserProfile);

//Blog credentional
app.post("/addblogs", postblogs);
//geting all blogs
app.get("/blogs", getBlog);
//read the blog from slug
app.get("/blog/:slug", getPerticularBlog);
//patch request published, draft, archive and delete
app.patch("/blog/status/:slug", patchUpdateStatus);


//server runnig
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is runnig on ${PORT}🚀`);
  connection(); //database connection
});
