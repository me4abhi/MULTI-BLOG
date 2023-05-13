import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Posts from "./pages/posts/posts";
import Login from "./components/Login/Login";
import EditBlog from "./pages/EditBlog/EditBlog";
import BlogPost from "./components/BlogPost/BlogPost";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:postId" element={<BlogPost />} />

          <Route path="/login" element={<Login />} />
          <Route path="/create-post" element={<EditBlog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
