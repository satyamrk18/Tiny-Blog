import Blog from "./../models/Blog.js"
const postblogs = async(req,res)=>
{
  const {title, category, content, author} = req.body;
  //in author we recieves the object ID
  //status = false
  if(!title || !category || !content || !author)
  {
    return res.status(401).json(
        {
            success:false,
            message:"all fields are required"
        }
    )
  }
  //status = true
  const newBlog = new Blog({
    title,
    category,
    content,
    author,
  });
  const saveBlog = await newBlog.save();
  saveBlog.slug = `${title.toLowerCase().replace(/ /g , "-")}-${saveBlog._id}`
  await saveBlog.save();
  console.log(saveBlog.slug);//slug generate successfully
  res.status(201).json(
    {
        success:true,
        blog:saveBlog,
        message:"Blog Created Successfully"
    }
  )
}
export {postblogs};