import { logout } from "../../services/authService";
import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <header id="header">
      <h1 id="header-title">
        <Link to="/">Multi Blog</Link>
      </h1>
      <NavLink to="/posts">Posts</NavLink>
      <NavLink to="/create-post">Create Post</NavLink>
      {/* <NavLink to="/">Login</NavLink> */}
      <NavLink to="/" onClick={handleLogout}>
        Logout
      </NavLink>
    </header>
  );
}

export default Header;
