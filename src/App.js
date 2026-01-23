import React, { useEffect } from "react";
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

import loggan from "./assets/loggan.png";

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
  // Forza hash iniziale su /dashboard se vuoto
  useEffect(() => {
    if (window.location.hash === "" || window.location.hash === "#") {
      window.location.hash = "#/dashboard";
    }
  }, []);

  return (
    <div className="app-container">
      <Router>
        <AnalyticsTracker />

        {/* HEADER */}
        <header
          className="app-header"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingLeft: "20px",
          }}
        >
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

        {/* ROUTES */}
        <Routes>
          {/* Redirect default */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* DASHBOARD */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* PLAYERS */}
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

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </div>
  );
}
