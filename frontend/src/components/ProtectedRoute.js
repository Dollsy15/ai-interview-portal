import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Props:
//   roles: optional array of allowed roles, e.g., ['admin', 'user']
export default function ProtectedRoute({ roles }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) return <Navigate to="/login" replace />;

  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    // Role not allowed, redirect to dashboard or home
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
