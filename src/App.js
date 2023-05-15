import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Posts from "./pages/posts/posts";
import BlogPost from "./components/BlogPost/BlogPost";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";
import CreatePost from "./components/CreatePost/CreatePost";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route element={<PrivateRoutes />}>
            <Route exact path="/create-post" element={<CreatePost />} />
            <Route exact path="/posts" element={<Posts />} />
            <Route exact path="/posts/:postId" element={<BlogPost />} />
          </Route>
          <Route element={<PublicRoutes />}>
            <Route exact path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
