const getCurrentUser = ()=>
{
 const user = localStorage.getItem("loggedinuser")
 if(user)
 {
    return JSON.parse(user);
 }
 else{
    return null;
 }
}
export {getCurrentUser};