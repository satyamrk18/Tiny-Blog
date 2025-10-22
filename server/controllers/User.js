import User from "./../models/User.js";
import md5 from "md5";
import { json } from "express";
//user sign up
const postsignup = async (req, res) => {
  const { name, email, password } = req.body;

  //regex expression for validation
  const nameRegexValodation = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;
  const emailRegexValidation =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegexValidation =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  //check all detials field or not
  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "name, email, password fiels must be filled.",
    });
  }

  //regex check
  if (nameRegexValodation.test(name) === false) {
    return res.json({
      success: false,
      message: "username not valied",
    });
  }
  if (emailRegexValidation.test(email) === false) {
    return res.json({ success: false, message: "email not valid" });
  }

  if (passwordRegexValidation.test(password) === false) {
    return res.json({
      success: false,
      message: "please enter strong password",
    });
  }

  //check the email id is already existes or not
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({
      success: false,
      message: `user already exist with ${email} email id`,
    });
  }

  //create a new user
  const newUser = new User({ name, email, password: md5(password) });
  const saveUser = await newUser.save();
  res.json({
    success: true,
    data: saveUser,
    message: "user created successfully",
  });
};
//user log in
const postlogin = async (req, res) => {
  const { email, password } = req.body;

  //check empty fields
  if (!email || !password) {
    return res.json({
      success: false,
      message: "please ente the email and password",
    });
  }
  //check email and password

  const existingUser = await User.findOne({
    email,
    password: md5(password),
  }).select("_id name email");
  try {
    if (existingUser) {
      return res.status(200).json({
        success: true,
        data: existingUser,
        message: "user found successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "user not found",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      message: "something went wrong",
    });
  }
};
//get user data
const getuser = async (req, res) => {
  try {
    const { id, name } = req.params;
    const user = await User.findOne({ _id: id, name: name });
    if (user) {
      res.status(200).json({
        success: true,
        data: user,
        message: "user find successfully !",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "something went wrong",
    });
  }
};

//edit user profile
const putEditUserProfile = async (req, res) => {
 try{
   const { name, id } = req.params;
  const { bio, summary, profilepic } = req.body;
  const user = await User.findOneAndUpdate(
    { name: name, _id: id },  
    { bio: bio, summary: summary, profilepic: profilepic },{new:true}
  );
  if (user) {
    res.json({
      success: true,
      data: user,
      message: "User Edit Successfully !",
    });
  } else {
    res.json({
      success: false,
      message: "something went wrong, please try again latter.",
    });
  }
 }
 catch(error)
 {
  res.status(500).json({
    success:false,
    message:"server internal error"
  })
 }
};
export { postsignup, postlogin, getuser, putEditUserProfile };
