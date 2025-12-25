import React, { useState, useEffect } from "react";
import { FaHome, FaClock, FaRunning, FaSpa, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function WellnessForm() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [formData, setFormData] = useState({
    soreness_muscle: 5,
    soreness_joint: 5,
    sleep_hours: 8,
    stress: 5,
    food_and_drink: 5,
    menstrual_cycle: "",
  });

  const menstrualOptions = ["", "No", "Yes", "Ovulation Phase", "Luteal Phase"];
  const isTablet = window.innerWidth >= 768;

  // Carica giocatori
  useEffect(() => {
    const fetchPlayers = async () => {
      const { data } = await supabase.from("Players").select("Name");
      if (data) setPlayers(data.map((p) => p.Name).sort((a, b) => a.localeCompare(b)));
    };
    fetchPlayers();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedPlayer) {
      alert("Please select a player");
      return;
    }

    const { error } = await supabase.from("MonitoringData").insert([
      {
        name: selectedPlayer,
        date: date,
        ...formData,
      },
    ]);

    if (!error) {
      alert("Wellness data saved ✔");
      setSelectedPlayer("");
      setDate(new Date().toISOString().split("T")[0]);
      setFormData({
        soreness_muscle: 5,
        soreness_joint: 5,
        sleep_hours: 8,
        stress: 5,
        food_and_drink: 5,
        menstrual_cycle: "",
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
    <div style={{ padding: 20, paddingBottom: 100 }}>
      <h2 style={{ fontSize: isTablet ? 26 : 22, fontWeight: 700, marginBottom: 20 }}>
        Daily Wellness Entry
      </h2>

      {/* PLAYER */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: 600, display: "block", marginBottom: 5 }}>Select Player</label>
        <div style={{ maxHeight: 150, overflowY: "auto", border: "1px solid #ccc", borderRadius: 6 }}>
          {players.map((p) => (
            <div
              key={p}
              onClick={() => setSelectedPlayer(p)}
              style={{
                padding: 10,
                cursor: "pointer",
                backgroundColor: selectedPlayer === p ? "#1976d2" : "transparent",
                color: selectedPlayer === p ? "#fff" : "#000",
                fontWeight: selectedPlayer === p ? 600 : 400,
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>

      {/* DATE */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: 600, display: "block", marginBottom: 5 }}>Date</label>
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

      {/* MENSTRUAL */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: 600, display: "block", marginBottom: 5 }}>Menstrual Cycle</label>
        <div style={{ maxHeight: 150, overflowY: "auto", border: "1px solid #ccc", borderRadius: 6 }}>
          {menstrualOptions.map((o) => (
            <div
              key={o}
              onClick={() => handleChange("menstrual_cycle", o)}
              style={{
                padding: 10,
                cursor: "pointer",
                backgroundColor: formData.menstrual_cycle === o ? "#1976d2" : "transparent",
                color: formData.menstrual_cycle === o ? "#fff" : "#000",
                fontWeight: formData.menstrual_cycle === o ? 600 : 400,
              }}
            >
              {o || "Select"}
            </div>
          ))}
        </div>
      </div>

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

      {/* BOTTOM NAV */}
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
          { icon: <FaUser />, screen: "/profile" },
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
