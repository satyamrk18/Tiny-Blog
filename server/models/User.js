import { model, Schema } from "mongoose";
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilepic:{type:String ,default:"https://cdn-icons-png.flaticon.com/128/7308/7308615.png"},
    bio:{type: String},
    summary:{type:String},
  },
  { timestamps: true, }
);

const User = model("User", userSchema);
export default User;
