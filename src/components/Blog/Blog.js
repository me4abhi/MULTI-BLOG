import "./Blog.css";
import ShareButtons from "../ShareButtons/ShareButtons";

function Blog({ postTitle, postAuthor, postContent }) {
  const URL = window.location.pathname;
  return (
    <div className="blog-full">
      <h2 className="blog-title">{postTitle}wefwef</h2>
      <div className="blog-author">
        <span className="blog-author-name">{postAuthor}</span>
      </div>
      <p className="blog-post">{postContent}</p>
      <ShareButtons url={URL} title={postTitle} />
    </div>
  );
}

export default Blog;
