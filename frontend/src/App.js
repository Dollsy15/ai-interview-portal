import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CodingRound from "./pages/CodingRound";
import AdminSubmissions from "./pages/AdminSubmissions";
import McqRound from "./pages/McqRound";
import BehavioralRound from "./pages/BehavioralRound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div style={{ minHeight: "80vh" }}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/coding" element={<CodingRound />} />
              <Route path="/admin/submissions" element={<AdminSubmissions />} />
              <Route path="/mcq" element={<McqRound />} />
              <Route path="/behavioral" element={<BehavioralRound />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
