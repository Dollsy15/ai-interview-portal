import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CodingRound from "./pages/CodingRound";
import McqRound from "./pages/McqRound";
import BehavioralRound from "./pages/BehavioralRound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/coding" element={<CodingRound />} />
          <Route path="/mcq" element={<McqRound />} />
          <Route path="/behavioral" element={<BehavioralRound />} />
        </Route>
      </Routes>
      <Footer /> {/* ⬅️ Footer appears on every page */}
    </div>
  );
}

export default App;
