import React, { useState, useEffect } from "react";
import { FaHome, FaClock, FaRunning, FaSpa } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function WellnessForm() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [formData, setFormData] = useState({
    soreness_muscle: 5,
    soreness_joint: 5,
    sleep_hours: 8,
    stress: 5,
    food_and_drink: 5,
  });

  const isTablet = window.innerWidth >= 768;

  /* ===============================
     LOAD PLAYERS
  =============================== */
  useEffect(() => {
    const fetchPlayers = async () => {
      const { data } = await supabase.from("Players").select("Name");
      if (data) {
        setPlayers(data.map((p) => p.Name).sort((a, b) => a.localeCompare(b)));
      }
    };
    fetchPlayers();
  }, []);

  /* ===============================
     HANDLE FORM CHANGE
  =============================== */
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /* ===============================
     SAVE WELLNESS
  =============================== */
  const handleSubmit = async () => {
    if (!selectedPlayer) {
      alert("Please select a player");
      return;
    }

    const { error } = await supabase.from("MonitoringData").insert([
      {
        name: selectedPlayer,
        date,
        ...formData,
      },
    ]);

    if (!error) {
      alert("Wellness data saved ✔");
      setSelectedPlayer(null);
      setDate(new Date().toISOString().split("T")[0]);
      setFormData({
        soreness_muscle: 5,
        soreness_joint: 5,
        sleep_hours: 8,
        stress: 5,
        food_and_drink: 5,
      });
    } else {
      alert("Error saving data");
    }
  };

  const renderSlider = (label, field, min, max) => (
    <div style={{ marginBottom: 15 }}>
      <label style={{ fontWeight: 600, display: "block", marginBottom: 5 }}>
        {label}: {formData[field]}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step="1"
        value={formData[field]}
        onChange={(e) => handleChange(field, Number(e.target.value))}
        style={{ width: "100%" }}
      />
    </div>
  );

  return (
    <div style={{ padding: 20, paddingBottom: 120 }}>
      <h2
        style={{
          fontSize: isTablet ? 26 : 22,
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        Daily Wellness Entry
      </h2>

      {/* PLAYER SELECTION */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: 600, display: "block", marginBottom: 5 }}>
          Select Player
        </label>
        <div
          style={{
            maxHeight: 180,
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: 6,
            padding: selectedPlayer ? 12 : 0,
            display: selectedPlayer ? "flex" : "block",
            justifyContent: selectedPlayer ? "center" : "flex-start",
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
                width: "100%",
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
                  padding: 10,
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

      {/* DATE */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: 600, display: "block", marginBottom: 5 }}>
          Date
        </label>
        <input
          type="date"
          value={date}
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />
      </div>

      {/* SLIDERS */}
      {renderSlider("Muscle Soreness (1–10)", "soreness_muscle", 1, 10)}
      {renderSlider("Joint Soreness (1–10)", "soreness_joint", 1, 10)}
      {renderSlider("Sleep Hours", "sleep_hours", 0, 12)}
      {renderSlider("Stress Level (1–10)", "stress", 1, 10)}
      {renderSlider("Food & Hydration (1–10)", "food_and_drink", 1, 10)}

      {/* SAVE BUTTON */}
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: "#1976d2",
          padding: 14,
          borderRadius: 6,
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
          width: "100%",
          marginTop: 10,
        }}
      >
        Save Wellness
      </button>

      {/* BOTTOM NAVIGATION */}
      <div
        style={{
          height: 70,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#555",
          position: "fixed",
          bottom: 0,
          width: "100%",
          color: "#fff",
        }}
      >
        {[
          { icon: <FaHome />, screen: "/" },
          { icon: <FaClock />, screen: "/rpe" },
          { icon: <FaRunning />, screen: "/preactivation" },
          { icon: <FaSpa />, screen: "/workout" },
        ].map((tab, i) => (
          <button
            key={i}
            onClick={() => navigate(tab.screen)}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              fontSize: 26,
            }}
          >
            {tab.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
