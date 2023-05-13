import { doc, collection, addDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export const createBlogPost = async ({ postTitle, postContent }) => {
  try {
    const docRef = await addDoc(collection(db, "blogPosts"), {
      postTitle: postTitle,
      postContent: postContent,
      author: "anonymous",
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error in createBlogPost: ", error);
  }
};

export const fetchBlogPosts = async () => {
  try {
    const postsSnapshot = await getDocs(collection(db, "blogPosts"));
    const allPosts = postsSnapshot.docs.map((doc) => ({
      postId: doc.id,
      postTitle: doc.data().postTitle,
      postAuthor: doc.data().author,
      postContent: doc.data().postContent,
    }));
    return allPosts;
  } catch (error) {
    throw error;
  }
};

export const fetchBlogPost = async (postId) => {
  try {
    const docRef = doc(db, "blogPosts", postId);
    const postSnap = await getDoc(docRef);
    if (postSnap.exists()) {
      console.log("postSnap.data()", postSnap.data());
      return { id: postSnap.id, ...postSnap.data() };
    }
  } catch (error) {
    throw error;
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
