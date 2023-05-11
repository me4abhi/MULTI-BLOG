import "./CreatePost.css";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

function CreatePost() {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const addData = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "blogPosts"), {
        postTitle: postTitle,
        postContent: postContent,
        author: "Abhinav",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setPostTitle("");
    setPostContent("");
  };

  return (
    <form id="create-post" onSubmit={addData}>
      <h1 id="create-new-post">Write a Post</h1>
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
  );
}

export default CreatePost;
