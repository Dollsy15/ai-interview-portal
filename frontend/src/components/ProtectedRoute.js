// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuthenticated = true; // Replace with your auth logic
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
