import { useEffect, useState } from "react";
import Blog from "../../components/Blog/Blog";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

function Blogs() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const readData = async () => {
      const allPosts = [];
      const querySnapshot = await getDocs(collection(db, "blogPosts"));
      querySnapshot.forEach((doc) => {
        allPosts.push({
          postId: doc.id,
          postTitle: doc.data().postTitle,
          postAuthor: doc.data().author,
          postContent: doc.data().postContent,
        });
      });
      setPosts(allPosts);
    };
    readData();
  }, []);

  return (
    <>
      <Header />
      {posts.map((post) => (
        <Blog
          key={post.postId}
          postTitle={post.postTitle}
          postAuthor={post.postAuthor}
          postContent={post.postContent}
        />
      ))}
      <Footer />
    </>
  );
}

export default Blogs;
