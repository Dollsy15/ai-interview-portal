// src/components/Navbar.js
import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // If on home page → transparent navbar
  const isHome = location.pathname === "/";
  const navbarStyle = isHome
    ? { background: "transparent", boxShadow: "none", position: "absolute" }
    : { background: "#1976d2" };

  return (
    <AppBar position="static" style={navbarStyle}>
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Home</Button>
        {isLoggedIn && (
          <>
            <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
            <Button color="inherit" component={Link} to="/coding">Coding</Button>
            <Button color="inherit" component={Link} to="/mcq">MCQ</Button>
            <Button color="inherit" component={Link} to="/behavior">Behavior</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}