import React, { useState, useEffect } from "react";
import { FaHome, FaClock, FaRunning, FaSpa } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

/* Responsive hook */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

export default function RPE() {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [rpe, setRpe] = useState(null);
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [message, setMessage] = useState("");
  const [activeRpeInfo, setActiveRpeInfo] = useState(null);

  const rpeDescriptions = {
    1: "Very light activity – minimal effort",
    2: "Easy breathing, can talk comfortably — like light training or relaxed ball work",
    3: "Easy breathing, can talk comfortably — like light training or relaxed ball work",
    4: "Breathing heavily but still able to say a few sentences, the effort is still manageable but becoming more demanding — like playing at match tempo with constant off-the-ball runs, defensive recovery runs, and movements",
    5: "Breathing heavily but still able to say a few sentences, the effort is still manageable but becoming more demanding — like playing at match tempo with constant off-the-ball runs, defensive recovery runs, and movements",
    6: "Breathing heavily but still able to say a few sentences, the effort is still manageable but becoming more demanding — like playing at match tempo with constant off-the-ball runs, defensive recovery runs, and movements",
    7: "Slightly uncomfortable, breathing harder, but still able to talk — like steady match tempo with repeated movements",
    8: "Slightly uncomfortable, breathing harder, but still able to talk — like steady match tempo with repeated movements",
    9: "Very hard to keep the intensity, heavy breathing, can only say a few words — like continuous pressing or repeated sprints",
    10: "Feels like an all-out sprint, completely out of breath, impossible to continue for more than a few seconds",
  };

  /* AUTH */
  useEffect(() => {
    const storedEmail = localStorage.getItem("loggedInUser");
    if (!storedEmail) {
      navigate("/login");
      return;
    }
    setIsAuthenticated(true);
  }, [navigate]);

  /* LOAD PLAYERS */
  useEffect(() => {
    if (!isAuthenticated) return;
    supabase.from("Players").select("Name").then(({ data }) => {
      if (data) setPlayers(data.map(p => p.Name).sort());
    });
  }, [isAuthenticated]);

  /* SAVE */
  const handleSubmit = async () => {
    if (!selectedPlayer || !rpe || !duration) return;

    const dailyLoad = rpe * Number(duration);
    const weeklyLoad = dailyLoad * 7;

    const { error } = await supabase.from("workloads").insert([{
      RPE: rpe,
      date,
      daily_load: dailyLoad,
      weekly_load: weeklyLoad,
      name: selectedPlayer,
      duration: Number(duration)
    }]);

    if (!error) {
      setMessage("Workload saved successfully ✔");
      setSelectedPlayer("");
      setDuration("");
      setRpe(null);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        paddingBottom: 120
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: isDesktop ? "40px 32px" : "24px 20px"
        }}
      >
        <h2 style={{ marginBottom: 30, fontWeight: 700 }}>
          RPE & Workload Entry
        </h2>

        {/* PLAYER */}
        <div style={{ marginBottom: 30 }}>
          <label style={{ fontWeight: 600 }}>Player</label>
          <div
            style={{
              marginTop: 10,
              background: "#fff",
              borderRadius: 10,
              border: "1px solid #ddd",
              maxHeight: 180,
              overflowY: "auto"
            }}
          >
            {players.map(p => (
              <div
                key={p}
                onClick={() => setSelectedPlayer(p)}
                style={{
                  padding: "12px 14px",
                  cursor: "pointer",
                  background: selectedPlayer === p ? "#1976d2" : "transparent",
                  color: selectedPlayer === p ? "#fff" : "#000"
                }}
              >
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* DATE & DURATION */}
        <div style={{ display: "grid", gap: 24, marginBottom: 30 }}>
          <div>
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Duration (minutes)</label>
            <input
              type="number"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* RPE */}
        <div style={{ marginBottom: 40 }}>
          <label>RPE (1–10)</label>
          <div
            style={{
              marginTop: 14,
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 12
            }}
          >
            {[...Array(10)].map((_, i) => {
              const level = i + 1;
              return (
                <div
                  key={level}
                  onClick={() => setRpe(level)}
                  onMouseEnter={isDesktop ? () => setActiveRpeInfo(level) : undefined}
                  onMouseLeave={isDesktop ? () => setActiveRpeInfo(null) : undefined}
                  onTouchStart={() => setActiveRpeInfo(level)}
                  style={{
                    height: 52,
                    borderRadius: 12,
                    background: rpe === level ? "#1976d2" : "#fff",
                    color: rpe === level ? "#fff" : "#000",
                    border: "1px solid #1976d2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    position: "relative"
                  }}
                >
                  {level}

                  {activeRpeInfo === level && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "120%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#fff",
                        border: "1px solid #1976d2",
                        padding: 10,
                        borderRadius: 8,
                        width: 230,
                        fontSize: 13,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        zIndex: 10
                      }}
                    >
                      {rpeDescriptions[level]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SAVE */}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: 16,
            borderRadius: 12,
            background: "#1976d2",
            color: "#fff",
            fontWeight: 700,
            border: "none",
            fontSize: 16
          }}
        >
          Save Workload
        </button>

        {message && (
          <p style={{ marginTop: 20, fontWeight: 600, color: "green" }}>
            {message}
          </p>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          height: 72,
          background: "#1e1e1e",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          color: "#fff"
        }}
      >
        {[{ icon: <FaHome />, to: "/" }, { icon: <FaClock />, to: "/workout" }, { icon: <FaRunning />, to: "/preactivation" }, { icon: <FaSpa />, to: "/wellness" }]
          .map((t, i) => (
            <button
              key={i}
              onClick={() => navigate(t.to)}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: 24
              }}
            >
              {t.icon}
            </button>
          ))}
      </div>
    </div>
  );
}

/* Shared input style */
const inputStyle = {
  marginTop: 8,
  width: "100%",
  padding: 14,
  borderRadius: 10,
  border: "1px solid #ccc",
  fontSize: 15
};
