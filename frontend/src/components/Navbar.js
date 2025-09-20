import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ background: "#282c34", padding: "1rem" }}>
      <Link style={{ color: "white", marginRight: "1rem" }} to="/">Home</Link>
      <Link style={{ color: "white", marginRight: "1rem" }} to="/dashboard">Dashboard</Link>
      <Link style={{ color: "white", marginRight: "1rem" }} to="/login">Login</Link>
      <Link style={{ color: "white" }} to="/register">Register</Link>
    </nav>
  );
}
export default Navbar;