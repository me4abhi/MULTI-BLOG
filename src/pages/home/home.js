import Login from "../../components/Login/Login";
import Posts from "../posts/posts";

let isAuthenticated = localStorage.getItem("isLoggedIn");

function Home() {
  return isAuthenticated ? <Posts /> : <Login />;
}

export default Home;
