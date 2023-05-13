import "./BlogPost.css";
import ShareButtons from "../ShareButtons/ShareButtons";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchBlogPost } from "../../services/blogService";

function BlogPost({ postTitle, postAuthor, postContent }) {
  const URL = window.location.pathname;
  const { postId } = useParams();

  useEffect(() => {
    fetchBlogPost(postId);
  }, [postId]);

  return (
    <div className="blog-full">
      <h2 className="blog-title">{postTitle}</h2>
      <div className="blog-author">
        <span className="blog-author-name">{postAuthor}</span>
      </div>
      <p className="blog-post">{postContent}</p>
      <ShareButtons url={URL} title={postTitle} />
    </div>
  );
}

export default BlogPost;
