import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CodingRound from "./pages/CodingRound";
import McqRound from "./pages/McqRound";
import BehaviorRound from "./pages/BehavioralRound";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/coding" element={<CodingRound />} />
        <Route path="/mcq" element={<McqRound />} />
        <Route path="/behavior" element={<BehaviorRound />} />
      </Routes>
    </div>
  );
}
export default App;
