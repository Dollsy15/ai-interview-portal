// src/components/Navbar.js
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ background: "#1976d2" }}>
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