import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Workout from "./components/Workout";
import PreActivation from "./components/PreActivation";
import RPE from "./components/RPE";
import WellnessForm from "./components/WellnessForm";
import Login from "./components/Login";

import loggan from "./assets/loggan.png";
import splashImg from "./assets/splash.png";

// ---------------- GA4 Tracker per SPA ----------------
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-T046TG6KCJ", {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return null;
};

// ---------------- App principale ----------------
export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [fade, setFade] = useState(1);

  // Effetto splash
  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(0);
      setTimeout(() => setShowSplash(false), 600);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Carica utente salvato
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Router>
        {/* GA4 Tracker */}
        <AnalyticsTracker />

        {/* Header con logo ingrandibile */}
        <header
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 16px",
            background: "linear-gradient(135deg, #e2e8f0, #f8fafc)",
            boxShadow: "0 4px 16px rgba(15, 23, 42, 0.12)",
          }}
        >
          <img
            src={loggan}
            alt="Logo"
            style={{
              height: "clamp(80px, 12vw, 180px)", // Altezza flessibile tra mobile e desktop
              width: "auto",
              maxWidth: "100%",
              cursor: "pointer",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </header>


        <Routes>
          <Route path="/" element={<Dashboard user={user} setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/preactivation" element={<PreActivation />} />
          <Route path="/rpe" element={<RPE user={user} />} />
          <Route path="/wellness" element={<WellnessForm user={user} />} />
        </Routes>
      </Router>

      {/* Splash Screen */}
      {showSplash && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            opacity: fade,
            transition: "opacity 0.6s ease",
          }}
        >
          <img
            src={splashImg}
            alt="Splash"
            style={{
              width: "80%",
              height: "80%",
              objectFit: "contain",
            }}
          />
        </div>
      )}
    </div>
  );
}
