import { firestore } from '../firebase';

const blogCollection = firestore.collection('blogs');

export const createBlog = async (blog) => {
  try {
    const newBlogRef = await blogCollection.add(blog);
    const newBlog = await newBlogRef.get();
    return {
      id: newBlogRef.id,
      ...newBlog.data()
    };
  } catch (error) {
    console.log(error);
  }
};

export const updateBlog = async (blog) => {
  try {
    await blogCollection.doc(blog.id).update(blog);
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog = async (blogId) => {
  try {
    await blogCollection.doc(blogId).delete();
  } catch (error) {
    console.log(error);
  }
};

export const getBlogs = async () => {
  try {
    const blogsSnapshot = await blogCollection.get();
    return blogsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.log(error);
  }
};
