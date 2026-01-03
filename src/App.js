import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Workout from "./components/Workout";
import PreActivation from "./components/PreActivation";
import RPE from "./components/RPE";
import WellnessForm from "./components/WellnessForm";
import Login from "./components/Login";

import loggan from "./assets/loggan.png";
import palla from "./assets/palla.png";
import splashImg from "./assets/splash.png";

import "./App.css";

// ---------------- GA4 Tracker per SPA ----------------
const AnalyticsTracker = () => {
  const location = useLocation();
  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-T046TG6KCJ", { page_path: location.pathname });
    }
  }, [location]);
  return null;
};

// ---------------- App principale ----------------
export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [showSplashImage, setShowSplashImage] = useState(false);
  const [fade, setFade] = useState(1);

  // Effetto splash
  useEffect(() => {
    // Dopo il rimbalzo della palla, mostra lo splash sopra
    const timer = setTimeout(() => {
      setShowSplashImage(true);
      // Dopo un po’, fade out
      setTimeout(() => {
        setFade(0);
        setTimeout(() => setShowSplash(false), 600);
      }, 1500); // tempo visualizzazione splash
    }, 2500); // durata rimbalzo palla
    return () => clearTimeout(timer);
  }, []);

  // Carica utente salvato
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <div className="app-container">
      <Router>
        <AnalyticsTracker />

        {/* Header con logo */}
        <header className="app-header">
          <img
            src={loggan}
            alt="Logo"
            className="app-logo"
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
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

      {/* Splash screen */}
      {showSplash && (
        <div className="splash-container" style={{ opacity: fade }}>
          <img src={palla} alt="Palla" className="splash-ball" />
          {showSplashImage && (
            <img src={splashImg} alt="Splash" className="splash-overlay" />
          )}
        </div>
      )}
    </div>
  );
}
