import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Posts from "./pages/posts/posts";
import Login from "./components/Login/Login";
import BlogPost from "./components/BlogPost/BlogPost";
import { useState } from "react";
import PrivateRoutes from "./utils/PrivateRoutes";
import CreatePost from "./components/CreatePost/CreatePost";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:postId" element={<BlogPost />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/create-post" element={<CreatePost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
