import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Blogs from "./pages/Blogs/Blogs";
import Login from "./components/Login/Login";
import EditBlog from "./pages/EditBlog/EditBlog";
import BlogPostCard from "./components/BlogPostCard/BlogPostCard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-post" element={<EditBlog />} />
          <Route path="/blog-post-card" element={<BlogPostCard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
