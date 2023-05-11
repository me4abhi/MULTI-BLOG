import './Header.css'
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header id="header">
            <h1 id='header-title'>Multi Blog</h1>
            <NavLink to="/create-post">Create Post</NavLink>
            <NavLink to="">Sign Out</NavLink>
        </header>
    );
}

export default Header;