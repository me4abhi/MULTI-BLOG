import "./BlogPost.css";
import ShareButtons from "../ShareButtons/ShareButtons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBlogPost } from "../../services/blogService";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function BlogPost() {
  const URL = window.location.pathname;
  const { postId } = useParams();
  const [blogPost, setBlogPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      await fetchBlogPost(postId)
        .then((response) => {
          console.log(response);
          setBlogPost(response);
        })
        .catch((error) => {
          console.log("Error caught in BlogPost.js - useEffect", error);
        });
    };
    fetchPost();
  }, [postId]);

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="blog-full">
        <h2 className="blog-title">{blogPost.postTitle}</h2>
        <div className="blog-author">
          <span className="blog-author-name">{blogPost.author}</span>
        </div>
        <p className="blog-post">{blogPost.postContent}</p>
        <ShareButtons url={URL} title={blogPost.postTitle} />
      </div>
      <Footer />
    </>
  );
}

export default BlogPost;
