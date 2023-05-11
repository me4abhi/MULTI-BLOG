import './Header.css'
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header id="header">
            <h1>Multi Blog</h1>
            <NavLink to="">Sign Out</NavLink>
        </header>
    );
}

export default Header;