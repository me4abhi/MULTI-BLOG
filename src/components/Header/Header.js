import { logout } from "../../services/authService";
import "./Header.css";
import { Link, NavLink, Navigate } from "react-router-dom";

function Header() {
  let isAuthenticated = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    logout();
    <Navigate to="/" />;
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };

  return (
    <header id="header">
      <h1 id="header-title">
        <Link>Multi Blog</Link>
      </h1>

      {isAuthenticated ? (
        <>
          <NavLink to="/posts">Posts</NavLink>
          <NavLink to="/create-post">Create Post</NavLink>
          <NavLink to="/" onClick={handleLogout}>
            Logout
          </NavLink>
        </>
      ) : (
        <></>
      )}
    </header>
  );
}

export default Header;
