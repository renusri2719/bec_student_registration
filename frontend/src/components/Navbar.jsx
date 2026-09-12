import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/" style={{ fontSize: "18px", fontWeight: "bold" }}>
        Student Registration System
      </Link>
      <Link to="/register">Register Student</Link>
    </nav>
  );
}

export default Navbar;
