import './Header.css'
import { Link, NavLink } from "react-router-dom";

function Header() {
    return (
        <header id="header">
            <h1 id='header-title'>
                <Link to="/">
                    Multi Blog
                </Link>
            </h1>
            <NavLink to="/create-post">Create Post</NavLink>
            <NavLink to="">Sign Out</NavLink>
        </header>
    );
}

export default Header;