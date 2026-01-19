import React, { useState, useEffect } from "react";
import { FaHome, FaClock, FaRunning, FaSpa, FaTimes } from "react-icons/fa";
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

  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [rpe, setRpe] = useState(null);
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [message, setMessage] = useState("");
  const [activeRpeInfo, setActiveRpeInfo] = useState(null);

  const rpeDescriptions = {
    1: "Very light activity – minimal effort",
    2: "Easy breathing, can talk comfortably — light training or relaxed ball work",
    3: "Easy breathing, can talk comfortably — light training or relaxed ball work",
    4: "Breathing heavily but still able to say a few sentences — match tempo with constant movement",
    5: "Breathing heavily but still able to say a few sentences — match tempo with constant movement",
    6: "Breathing heavily but still able to say a few sentences — match tempo with constant movement",
    7: "Slightly uncomfortable, breathing harder, but still able to talk — steady match tempo",
    8: "Slightly uncomfortable, breathing harder, but still able to talk — steady match tempo",
    9: "Very hard to keep the intensity, heavy breathing, can only say a few words",
    10: "All-out sprint, completely out of breath, impossible to continue more than a few seconds",
  };

  /* LOAD PLAYERS */
  useEffect(() => {
    const fetchPlayers = async () => {
      const { data } = await supabase.from("Players").select("Name");
      if (data) setPlayers(data.map((p) => p.Name).sort());
    };
    fetchPlayers();
  }, []);

  /* SAVE WORKLOAD */
  const handleSubmit = async () => {
    if (!selectedPlayer || !rpe || !duration) return;

    const dailyLoad = rpe * Number(duration);
    const weeklyLoad = dailyLoad * 7;

    const { error } = await supabase.from("workloads").insert([
      {
        RPE: rpe,
        date,
        daily_load: dailyLoad,
        weekly_load: weeklyLoad,
        name: selectedPlayer,
        duration: Number(duration),
      },
    ]);

    if (!error) {
      setMessage("Workload saved successfully ✔");
      setRpe(null);
      setDuration("");
      setActiveRpeInfo(null);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        paddingBottom: 120,
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: isDesktop ? "40px 32px" : "24px 20px",
        }}
      >
        <h2 style={{ marginBottom: 30, fontWeight: 700 }}>RPE & Workload Entry</h2>

        {/* PLAYER SELECTION */}
        <div style={{ marginBottom: 30 }}>
          <label style={{ fontWeight: 600 }}>Player</label>
          <div
            style={{
              marginTop: 10,
              background: "#fff",
              borderRadius: 10,
              border: "1px solid #ddd",
              maxHeight: 200,
              overflowY: "auto",
              padding: selectedPlayer ? 12 : 0,
            }}
          >
            {selectedPlayer ? (
              <div
                style={{
                  padding: "14px 16px",
                  background: "#1976d2",
                  color: "#fff",
                  borderRadius: 10,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {selectedPlayer}
                <button
                  onClick={() => setSelectedPlayer(null)}
                  style={{
                    marginLeft: 12,
                    padding: "2px 8px",
                    fontSize: 12,
                    borderRadius: 6,
                    border: "none",
                    cursor: "pointer",
                    background: "#fff",
                    color: "#1976d2",
                    fontWeight: 600,
                  }}
                >
                  Change
                </button>
              </div>
            ) : (
              players.map((p) => (
                <div
                  key={p}
                  onClick={() => setSelectedPlayer(p)}
                  style={{
                    padding: "12px 14px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {p}
                </div>
              ))
            )}
          </div>
        </div>

        {/* DATE & DURATION */}
        <div style={{ display: "grid", gap: 24, marginBottom: 30 }}>
          <div>
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Duration (minutes)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* RPE GRID */}
        <div style={{ marginBottom: 40 }}>
          <label>RPE (1–10)</label>
          <div
            style={{
              marginTop: 14,
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 12,
            }}
          >
            {[...Array(10)].map((_, i) => {
              const level = i + 1;
              const isActive = activeRpeInfo === level;
              return (
                <div
                  key={level}
                  onClick={() => {
                    setRpe(level);
                    setActiveRpeInfo(level);
                  }}
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
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  {level}

                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "120%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#f9f9f9",
                        border: "1px solid #1976d2",
                        padding: 10,
                        borderRadius: 8,
                        width: 230,
                        fontSize: 13,
                        color: "#000",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        zIndex: 10,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>{rpeDescriptions[level]}</span>
                        <FaTimes
                          onClick={(e) => {
                            e.stopPropagation(); // impedisce di cliccare anche il livello
                            setActiveRpeInfo(null);
                          }}
                          style={{ cursor: "pointer", color: "#1976d2" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SAVE BUTTON */}
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
            fontSize: 16,
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

      {/* BOTTOM NAVIGATION */}
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
          color: "#fff",
        }}
      >
        {[
          { icon: <FaHome />, to: "/" },
          { icon: <FaClock />, to: "/workout" },
          { icon: <FaRunning />, to: "/preactivation" },
          { icon: <FaSpa />, to: "/wellness" },
        ].map((t, i) => (
          <button
            key={i}
            onClick={() => navigate(t.to)}
            style={{ background: "none", border: "none", color: "#fff", fontSize: 24 }}
          >
            {t.icon}
          </button>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  marginTop: 8,
  width: "100%",
  padding: 14,
  borderRadius: 10,
  border: "1px solid #ccc",
  fontSize: 15,
};
