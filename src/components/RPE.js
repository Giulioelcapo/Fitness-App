import React, { useState, useEffect } from "react";
import { FaHome, FaClock, FaRunning, FaSpa } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // mantiene Supabase per il DB

export default function RPE() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [rpe, setRpe] = useState(null);
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [message, setMessage] = useState("");

  // Controllo login
  useEffect(() => {
    const storedEmail = localStorage.getItem("loggedInUser");
    if (!storedEmail) {
      alert("Devi effettuare il login per accedere a RPE");
      navigate("/login");
      return;
    }
    setUserEmail(storedEmail);
    setIsAuthenticated(true);
  }, [navigate]);

  // Caricamento giocatori
  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchPlayers = async () => {
      const { data } = await supabase.from("Players").select("Name");
      if (data) setPlayers(data.map((p) => p.Name).sort((a, b) => a.localeCompare(b)));
    };
    fetchPlayers();
  }, [isAuthenticated]);

  // Salvataggio RPE
  const handleSubmit = async () => {
    if (!selectedPlayer || !rpe || !duration) {
      alert("Compila tutti i campi");
      return;
    }
    const dailyLoad = Number(duration) * rpe;

    const { error } = await supabase.from("workloads").insert([
      {
        coach_email: userEmail,
        name: selectedPlayer,
        date: date,
        duration: Number(duration),
        daily_load: dailyLoad,
        rpe: rpe,
      },
    ]);

    if (!error) {
      setMessage("Workload salvato ✔");
      setSelectedPlayer("");
      setDuration("");
      setRpe(null);
    } else {
      setMessage("Errore nel salvataggio");
    }
  };

  if (!isAuthenticated) return null;

  const isTablet = window.innerWidth >= 768;

  return (
    <div style={{ paddingBottom: 90, padding: 20 }}>
      <h2 style={{ fontSize: isTablet ? 26 : 22, fontWeight: 700, marginBottom: 20 }}>
        RPE & Workload Entry
      </h2>

      {/* PLAYER */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: 600, marginBottom: 5, display: "block" }}>Select Player</label>
        <div style={{ maxHeight: 120, overflowY: "auto", border: "1px solid #ccc", borderRadius: 6 }}>
          {players.map((p) => (
            <div
              key={p}
              onClick={() => setSelectedPlayer(p)}
              style={{
                padding: 10,
                backgroundColor: selectedPlayer === p ? "#1976d2" : "transparent",
                color: selectedPlayer === p ? "#fff" : "#000",
                cursor: "pointer",
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>

      {/* DATE */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: 600, marginBottom: 5, display: "block" }}>Date</label>
        <input
          type="date"
          value={date}
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />
      </div>

      {/* DURATION */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: 600, marginBottom: 5, display: "block" }}>Duration (min)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc", width: "100%" }}
        />
      </div>

      {/* RPE */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: 600, marginBottom: 5, display: "block" }}>RPE (1–10)</label>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {[...Array(10)].map((_, i) => {
            const level = i + 1;
            return (
              <div
                key={level}
                onClick={() => setRpe(level)}
                style={{
                  width: 40,
                  height: 40,
                  margin: 3,
                  border: "1px solid #1976d2",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: rpe === level ? "#1976d2" : "transparent",
                  color: rpe === level ? "#fff" : "#000",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {level}
              </div>
            );
          })}
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
        }}
      >
        Save Workload
      </button>

      {message && <p style={{ marginTop: 10, color: "green", fontWeight: 600 }}>{message}</p>}

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
          { icon: <FaClock />, screen: "/workout" },
          { icon: <FaRunning />, screen: "/preactivation" },
          { icon: <FaSpa />, screen: "/wellness" },
        ].map((tab, i) => (
          <button
            key={i}
            onClick={() => navigate(tab.screen)}
            style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: 26 }}
          >
            {tab.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
