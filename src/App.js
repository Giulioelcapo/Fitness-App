import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
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

import clubLogo from "./assets/logo.png";

import { FaTrophy } from "react-icons/fa";

import "./App.css";

/* =========================
   GA4 TRACKER
========================= */
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
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // forza dashboard come root
    if (window.location.hash === "" || window.location.hash === "#") {
      window.location.hash = "#/dashboard";
    }

    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000); // durata splash (3s)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
      <Router>
        <AnalyticsTracker />

        {/* =========================
            SPLASH SCREEN
        ========================= */}
        {showIntro ? (
          <div className="intro-screen">
            <FaTrophy className="intro-trophy" />

            <h1 className="intro-text">
              Champions of the Last Season
            </h1>

            <p className="intro-subtext">
              Elitettan 2025
            </p>

            <img
              src={clubLogo}
              alt="Club Logo"
              className="intro-club-logo"
            />
          </div>
        ) : (
          /* =========================
              ROUTES (NO HEADER)
          ========================= */
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/players" element={<Players />} />
            <Route path="/players/:number" element={<PlayerAccess />} />
            <Route
              path="/player/:number/dashboard"
              element={<PlayerDashboard />}
            />
            <Route path="/rpe" element={<RPE />} />
            <Route path="/wellness" element={<WellnessForm />} />
            <Route path="/workout" element={<Workout />} />
            <Route path="/preactivation" element={<PreActivation />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}
