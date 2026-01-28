import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaClock,
  FaRunning,
  FaSpa,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import loggan from "../assets/loggan.png";

export default function WellnessForm() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [formData, setFormData] = useState({
    soreness_muscle: 5,
    soreness_joint: 5,
    sleep_quality: 5,
    stress: 5,
    food_and_drink: 5,
  });

  const isTablet = window.innerWidth >= 768;
  const HEADER_HEIGHT = 130;
  const BOTTOM_HEIGHT = 72;

  /* ===============================
     LOAD PLAYERS
  =============================== */
  useEffect(() => {
    const fetchPlayers = async () => {
      const { data } = await supabase.from("Players").select("Name");
      if (data) {
        setPlayers(
          data.map((p) => p.Name).sort((a, b) => a.localeCompare(b))
        );
      }
    };
    fetchPlayers();
  }, []);

  /* ===============================
     HELPERS
  =============================== */
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getStatusIcon = (value, inverse = false) => {
    const good = inverse ? value >= 8 : value <= 3;
    const medium = value > 3 && value < 8;

    if (good) return <FaCheckCircle size={20} color="#00A86B" />;
    if (medium) return <FaExclamationCircle size={20} color="#F4B400" />;
    return <FaTimesCircle size={20} color="#D93025" />;
  };

  /* ===============================
     SAVE (WITH DUPLICATE CHECK)
  =============================== */
  const handleSubmit = async () => {
    if (!selectedPlayer) {
      alert("Please select a player");
      return;
    }

    // 1️⃣ Check if record already exists
    const { data: existingData, error: checkError } = await supabase
      .from("MonitoringData")
      .select("id")
      .eq("name", selectedPlayer)
      .eq("date", date);

    if (checkError) {
      alert("Error checking existing data");
      return;
    }

    // 2️⃣ If exists → ask confirmation
    if (existingData && existingData.length > 0) {
      const confirmReplace = window.confirm(
        "You have already entered data for this player on this date. Do you want to replace it?"
      );

      if (!confirmReplace) {
        return;
      }

      // 3️⃣ Delete old record
      await supabase
        .from("MonitoringData")
        .delete()
        .eq("name", selectedPlayer)
        .eq("date", date);
    }

    // 4️⃣ Insert new record
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
        sleep_quality: 5,
        stress: 5,
        food_and_drink: 5,
      });
    } else {
      alert("Error saving data");
    }
  };

  const renderSlider = (label, field, min, max, inverse = false) => (
    <div style={{ marginBottom: 26 }}>
      <label style={{ fontWeight: 600 }}>
        {label}: {formData[field]}
      </label>

      <input
        type="range"
        min={min}
        max={max}
        value={formData[field]}
        onChange={(e) => handleChange(field, Number(e.target.value))}
        style={{ width: "100%", marginTop: 6 }}
      />

      <div style={{ marginTop: 6 }}>
        {getStatusIcon(formData[field], inverse)}
      </div>
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        paddingTop: HEADER_HEIGHT,
        paddingBottom: BOTTOM_HEIGHT + 20,
      }}
    >
      {/* HEADER */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: HEADER_HEIGHT,
          backgroundColor: "#000",
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
          zIndex: 1000,
        }}
      >
        <img
          src={loggan}
          alt="Logo"
          onClick={() => navigate("/dashboard")}
          style={{ height: isTablet ? 70 : 55, cursor: "pointer" }}
        />
      </header>

      {/* CONTENT */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: isTablet ? "40px 32px" : "24px 20px",
        }}
      >
        <h2 style={{ fontWeight: 700, marginBottom: 24 }}>
          Daily Wellness Entry
        </h2>

        {/* PLAYER */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 600 }}>Select Player</label>
          <div
            style={{
              maxHeight: 180,
              overflowY: "auto",
              border: "1px solid #ccc",
              borderRadius: 6,
              marginTop: 6,
            }}
          >
            {selectedPlayer ? (
              <div
                style={{
                  padding: 14,
                  background: "#00A86B",
                  color: "#fff",
                  fontWeight: 700,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {selectedPlayer}
                <button
                  onClick={() => setSelectedPlayer(null)}
                  style={{
                    background: "#fff",
                    color: "#00A86B",
                    border: "none",
                    borderRadius: 6,
                    padding: "4px 10px",
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
                    borderBottom: "1px solid #eee",
                    cursor: "pointer",
                  }}
                >
                  {p}
                </div>
              ))
            )}
          </div>
        </div>

        {/* DATE */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 600 }}>Date</label>
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
        {renderSlider("Sleep Quality (1–10)", "sleep_quality", 1, 10, true)}
        {renderSlider("Stress Level (1–10)", "stress", 1, 10)}
        {renderSlider(
          "Food & Hydration (1–10)",
          "food_and_drink",
          1,
          10,
          true
        )}

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            backgroundColor: "#00A86B",
            padding: 14,
            borderRadius: 6,
            color: "#fff",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Save Wellness
        </button>
      </div>

      {/* BOTTOM NAV */}
      <div
        style={{
          height: BOTTOM_HEIGHT,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#000",
          position: "fixed",
          bottom: 0,
          width: "100%",
        }}
      >
        {[{ icon: <FaHome />, screen: "/" },
        { icon: <FaClock />, screen: "/rpe" },
        { icon: <FaRunning />, screen: "/preactivation" },
        { icon: <FaSpa />, screen: "/workout" }].map((tab, i) => (
          <button
            key={i}
            onClick={() => navigate(tab.screen)}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: 26,
              cursor: "pointer",
            }}
          >
            {tab.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
