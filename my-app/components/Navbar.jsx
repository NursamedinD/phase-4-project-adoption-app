import { Link } from "react-router-dom";
import React from "react";

function Navbar() {
    return (
        <div className="navbar">
        <h1>Child Adoption App</h1>
        <p>Lorem ipsum dolor sit amet.</p>
        <nav>
            <button><Link to="/">Adoption List</Link></button>
            <button><Link to="/add-child">Add a Child</Link></button>
            <button><Link to="/children">List of Children</Link></button>
            <button><Link to="add-parent">Add a Parent</Link></button>
            <button><Link to="/parents">List of Parents</Link></button>
            <button><Link to="/adopt-child">Adopted Children</Link></button>
        </nav>
        </div>
    );
}

export default Navbar;