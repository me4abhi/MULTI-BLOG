import Login from "../../components/Login/Login";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Posts from "../posts/posts";

let isAuthenticated = localStorage.getItem("isLoggedIn");

function Home() {
  return isAuthenticated ? <Posts /> : <Login />;
}

export default Home;
