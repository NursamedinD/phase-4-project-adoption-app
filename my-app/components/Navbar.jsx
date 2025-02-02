import { Link } from "react-router-dom";
import React from "react";

function Navbar() {
    return (
        <div>
        <h1>Child Adoption App</h1>
        <p>Lorem ipsum dolor sit amet.</p>
        <nav>
            <Link to="/">Adoption List</Link>
            <Link to="/add-child">Add a Child</Link>
            <Link to="/children">List of Children</Link>
            <Link to="add-parent">Add a Parent</Link>
            <Link to="/parents">List of Parents</Link>
            <Link to="/adopt-child">Adopted Children</Link>
        </nav>
        </div>
    );
}

export default Navbar;