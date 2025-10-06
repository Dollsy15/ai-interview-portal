// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{ background: "#1976d2", boxShadow: "0 4px 10px rgba(0,0,0,0.3)" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side: Always visible links */}
        <Box>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              fontWeight: "bold",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/about"
            sx={{
              ml: 2,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
            }}
          >
            About
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/contact"
            sx={{
              ml: 2,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
            }}
          >
            Contact
          </Button>
        </Box>

        {/* Right side: Conditional links */}
        <Box>
          {!token ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{
                  ml: 2,
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
                sx={{
                  ml: 2,
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                }}
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/dashboard"
                sx={{
                  ml: 2,
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                }}
              >
                Dashboard
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/coding"
                sx={{
                  ml: 2,
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                }}
              >
                Coding
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/mcq"
                sx={{
                  ml: 2,
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                }}
              >
                MCQ
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/behavioral"
                sx={{
                  ml: 2,
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                }}
              >
                Behavioral
              </Button>
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{
                  ml: 2,
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "rgba(255,0,0,0.3)" },
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
