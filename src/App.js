import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Workout from "./components/Workout";
import PreActivation from "./components/PreActivation";
import RPE from "./components/RPE";
import WellnessForm from "./components/WellnessForm";
import Players from "./components/Players";
import PlayerAccess from "./components/PlayerAccess";
import PlayerDashboard from "./components/PlayerDashboard";

import loggan from "./assets/loggan.png";
import palla from "./assets/palla.png";
import splashImg from "./assets/splash.png";

import "./App.css";

// ---------------- GA4 Tracker ----------------
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

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showSplashImage, setShowSplashImage] = useState(false);
  const [fade, setFade] = useState(1);

  // Splash screen animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashImage(true);
      setTimeout(() => {
        setFade(0);
        setTimeout(() => setShowSplash(false), 600);
      }, 1500);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
      <Router>
        <AnalyticsTracker />

        {/* HEADER */}
        <header className="app-header">
          <img
            src={loggan}
            alt="Logo"
            className="app-logo"
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.15)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          />
        </header>

        {/* ROUTES – LOGIN DISATTIVATO */}
        <Routes>
          <Route path="/" element={<Dashboard />} />

          {/* PLAYERS FLOW */}
          <Route path="/players" element={<Players />} />
          <Route path="/players/:number" element={<PlayerAccess />} />
          <Route
            path="/player/:number/dashboard"
            element={<PlayerDashboard />}
          />

          {/* DAILY INPUT */}
          <Route path="/rpe" element={<RPE />} />
          <Route path="/wellness" element={<WellnessForm />} />

          {/* TRAINING */}
          <Route path="/workout" element={<Workout />} />
          <Route path="/preactivation" element={<PreActivation />} />
        </Routes>
      </Router>

      {/* SPLASH SCREEN */}
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
