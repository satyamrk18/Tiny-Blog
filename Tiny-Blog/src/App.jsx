import {BrowserRouter, Routes, Route} from "react-router"
import Home from "./Views/Home.jsx";
const App = ()=>{
    return(
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
            </Routes>
            </BrowserRouter>
        </div>
    )
}
export default App;