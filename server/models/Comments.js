import {model,Schema} from "mongoose"

const commentsSchema = new Schema({
    content:{type:String},
    user:{type:Schema.Types.ObjectId, ref:"User", required:true},
    author:{types:Schema.Types.ObjectId, ref:"Blog", required:true},
},{timestamps:true,});

const Comments = model("Comments",commentsSchema);