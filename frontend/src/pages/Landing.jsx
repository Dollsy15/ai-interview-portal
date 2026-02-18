import React, { useState } from "react";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

const Landing = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.content}>
          <h1 style={styles.title} className="fadeIn">
            AI Interview Portal
          </h1>
          <p style={styles.subtitle}>
            Practice AI-powered interviews and get instant feedback to boost
            your career.
          </p>

          <div style={styles.buttonContainer}>
            <button
              style={styles.primaryBtn}
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
            <button
              style={styles.secondaryBtn}
              onClick={() => setShowSignup(true)}
            >
              Signup
            </button>
          </div>
        </div>

        <div style={styles.imageContainer}>
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
            alt="Interview Illustration"
            style={styles.heroImage}
          />
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        © {new Date().getFullYear()} AI Interview Portal. All rights reserved.
      </footer>

      {/* Fullscreen Grey Overlay */}
      {(showLogin || showSignup) && <div style={styles.overlay}></div>}

      {/* Modals */}
      <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
      <SignupModal show={showSignup} onClose={() => setShowSignup(false)} />

      {/* CSS animations */}
      <style>{`
        .fadeIn {
          animation: fadeIn 1.5s ease forwards;
          opacity: 0;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          div[style*="flex-direction: row"] {
            flex-direction: column !important;
          }
          img {
            width: 90% !important;
            margin: 20px 0 0 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: "100vh",
    backgroundColor: "#e0e0e0", // full grey background
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
  },
  heroSection: {
    display: "flex",
    flexDirection: "row",
    padding: "80px 40px",
    alignItems: "center",
    maxWidth: 1400,
    margin: "0 auto",
    gap: 60,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: "4rem", 
    marginBottom: 20,
    color: "#222",
  },
  subtitle: {
    fontSize: "1.5rem", 
    marginBottom: 40,
    color: "#555",
    lineHeight: 1.5,
  },
  buttonContainer: {
    display: "flex",
    gap: "20px",
  },
  primaryBtn: {
    padding: "18px 50px",
    fontSize: "1.2rem",
    borderRadius: 6,
    border: "none",
    backgroundColor: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
    transition: "background-color 0.3s ease",
  },
  secondaryBtn: {
    padding: "18px 50px",
    fontSize: "1.2rem",
    borderRadius: 6,
    border: "2px solid #4f46e5",
    backgroundColor: "transparent",
    color: "#4f46e5",
    cursor: "pointer",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  imageContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heroImage: {
    width: "100%", 
    maxWidth: "600px",
    borderRadius: 16,
    boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
    objectFit: "cover",
  },
  footer: {
    padding: "20px 0",
    textAlign: "center",
    color: "#999",
    fontSize: "0.9rem",
    borderTop: "1px solid #ccc",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1000,
  },
};

export default Landing;
