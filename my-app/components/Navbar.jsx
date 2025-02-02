import { Link } from "react-router-dom";
import React from "react";

function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/adopted-children">Adopted Children</Link>
            <Link to="/login">Login</Link>
            <Link to="/singup">Signup</Link>
        </nav>
    );
}

export default Navbar;