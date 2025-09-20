import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#1976d2",
        color: "white",
        py: 2,
        mt: 4,
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} AI Interview Portal. All rights reserved.
      </Typography>
      <Box sx={{ mt: 1 }}>
        <MuiLink
          href="https://github.com/Dollsy15/AI-interview-portal"
          target="_blank"
          rel="noopener"
          color="inherit"
          underline="hover"
          sx={{ mx: 1 }}
        >
          GitHub
        </MuiLink>
        <MuiLink href="/about" color="inherit" underline="hover" sx={{ mx: 1 }}>
          About
        </MuiLink>
        <MuiLink
          href="/contact"
          color="inherit"
          underline="hover"
          sx={{ mx: 1 }}
        >
          Contact
        </MuiLink>
      </Box>
    </Box>
  );
}
