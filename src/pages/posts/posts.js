import "./posts.css";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import BlogPostCard from "../../components/BlogPostCard/BlogPostCard";
import { fetchBlogPosts } from "../../services/blogService";
import { Link } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const readData = async () => {
      await fetchBlogPosts()
        .then((response) => {
          setPosts(response);
        })
        .catch((error) => {
          console.log("fetchBlogPosts Error: ", error);
        });
    };
    readData();
  }, []);

  return (
    <>
      <Header />
      {posts.length === 0 ? (
        <div className="center-loading">Loading...</div>
      ) : (
        <div id="posts-grid">
          {posts.map((post) => (
            <Link to={`/posts/${post.postId}`} key={post.postId}>
              <BlogPostCard
                postTitle={post.postTitle}
                postAuthor={post.postAuthor}
                postContent={post.postContent}
              />
            </Link>
          ))}
        </div>
      )}
      <Footer />
    </>
  );
}

export default Posts;
