//all imports
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import {postsignup,postlogin} from "./controllers/User.js"

//all midleware
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

//mongoose coonect to mongoDB

const connection = async ()=>
{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL);
    if(connect)
    {
        console.log("Database connect successfully ! 🔌")
    }
    else
    {
        console.log("There is a problem while conecting to database");
    }
    }
    catch(error)
    {
        console.log("something went wrong",error);
    }
}

//user credentials
//user sign up
app.post("/signup",postsignup);
//user log in
app.post("/login",postlogin);


//Blog credentional



//server runnig
const PORT = process.env.PORT || 8000
app.listen(PORT,()=>
{
    console.log(`server is runnig on ${PORT}🚀`);
    connection();//database connection
})