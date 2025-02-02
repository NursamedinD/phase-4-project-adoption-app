import { Link } from "react-router-dom";
import React from "react";

function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/adopted-children">Adopted Children</Link>
            <Link to="/add-child">Add a Child</Link>
            <Link to="/children">List of Children</Link>
        </nav>
    );
}

export default Navbar;