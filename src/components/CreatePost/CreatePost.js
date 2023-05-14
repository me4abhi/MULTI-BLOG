import "./CreatePost.css";
import { useState } from "react";
import { createBlogPost } from "../../services/blogService";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function CreatePost() {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const submitBlogPost = async (e) => {
    e.preventDefault();
    const blogData = { postTitle, postContent };
    await createBlogPost(blogData).catch((error) => {
      setResponseMessage(error.toString());
    });
    setPostTitle("");
    setPostContent("");
  };

  return (
    <>
      <Header />
      <form id="create-post" onSubmit={submitBlogPost}>
        <h1 id="write-a-post">Write a Post</h1>
        <label htmlFor="create-post-title" className="create-post-label">
          Post Title
        </label>
        <input
          type="text"
          id="create-post-title"
          name="create-post-title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <div className="gap"></div>
        <label htmlFor="create-post-content" className="create-post-label">
          Post Content
        </label>
        <textarea
          cols="100"
          rows="10"
          type="text"
          id="create-post-content"
          name="create-post-content"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <div className="gap"></div>
        <button id="create-post-btn">Create</button>
      </form>
      <div className="repsonse-message">{responseMessage}</div>
      <Footer />
    </>
  );
}

export default CreatePost;
