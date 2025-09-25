import {BrowserRouter, Routes, Route} from "react-router"
import Home from "./Views/Home.jsx";
import AllBlog from "./Views/AllBlog.jsx";
import EditBlog from "./Views/EditBlog.jsx";
import NewBlog from "./Views/NewBlog.jsx";
import ReadBlog from "./Views/ReadBlog.jsx";
const App = ()=>{
    return(
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/new"></Route>
                <Route path="/edit/:id" element={<EditBlog />}></Route>
                <Route path="/blog/:slug" element={<ReadBlog />}></Route>
                <Route path="*" element={<h1 className="text-center mt-5">page not found</h1>}></Route>
            </Routes>
            </BrowserRouter>
        </div>
    )
}
export default App;