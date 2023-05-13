import "./BlogPostCard.css";

function BlogPostCard({ postTitle, postAuthor, postContent }) {
  return (
    <div className="blog-post-card">
      <h2 className="blog-post-card-title">{postTitle}</h2>
      <div className="blog-post-card-author">{postAuthor}</div>
      <p className="blog-post-card-content">{postContent}</p>
    </div>
  );
}

export default BlogPostCard;
