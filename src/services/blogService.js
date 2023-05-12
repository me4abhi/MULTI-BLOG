import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export const createBlogPost = async ({ postTitle, postContent }) => {
  try {
    const docRef = await addDoc(collection(db, "blogPosts"), {
      postTitle: postTitle,
      postContent: postContent,
      author: "Abhinav",
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// export const updateBlog = async (blog) => {
//   try {
//     await blogCollection.doc(blog.id).update(blog);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deleteBlog = async (blogId) => {
//   try {
//     await blogCollection.doc(blogId).delete();
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getBlogs = async () => {
//   try {
//     const blogsSnapshot = await blogCollection.get();
//     return blogsSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//   } catch (error) {
//     console.log(error);
//   }
// };
