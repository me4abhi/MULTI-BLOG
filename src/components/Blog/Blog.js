import "./Blog.css";
import { collection, getDocs } from "firebase/firestore"; 

function Blog({postTitle, postAuthor, postContent}) {
  return (
    <div className="blog-full">
      <h2 className="blog-title">{postTitle}wefwef</h2>
      <div className="blog-author">
        <span className="blog-author-name">{postAuthor}</span>
      </div>
      <p className="blog-post">
        {postContent}
      </p>
    </div>
  );
}

export default Blog;
