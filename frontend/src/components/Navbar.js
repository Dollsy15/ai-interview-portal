// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ background: "#1976d2" }}>
      <Toolbar>
        {/* Always visible (Public links) */}
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/about">
          About
        </Button>
        <Button color="inherit" component={Link} to="/contact">
          Contact
        </Button>

        {/* If NOT logged in → Login/Register buttons */}
        {!token && (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}

        {/* ✅ If logged in → Show Dashboard + rounds + Logout */}
        {token && (
          <>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/coding">
              Coding
            </Button>
            <Button color="inherit" component={Link} to="/mcq">
              MCQ
            </Button>
            <Button color="inherit" component={Link} to="/behavioral">
              Behavioral
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
