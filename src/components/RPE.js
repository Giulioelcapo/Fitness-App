import React, { useState, useEffect } from "react";
import { FaHome, FaClock, FaRunning, FaSpa, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import loggan from "../assets/loggan.png";

/* =========================
   RESPONSIVE HOOK
========================= */
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

  const HEADER_HEIGHT = 130;
  const BOTTOM_HEIGHT = 72;
  const PRIMARY = "#00A86B";

  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [rpe, setRpe] = useState(null);
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [message, setMessage] = useState("");
  const [activeRpeInfo, setActiveRpeInfo] = useState(null);

  const rpeDescriptions = {
    1: "Very light activity – minimal effort",
    2: "Easy breathing, can talk comfortably",
    3: "Light training or relaxed ball work",
    4: "Breathing heavily, still able to speak",
    5: "Match tempo with constant movement",
    6: "Match tempo with constant movement",
    7: "Hard but controlled intensity",
    8: "Hard, breathing difficult",
    9: "Very hard, only few words possible",
    10: "All-out effort, maximal intensity",
  };

  /* LOAD PLAYERS */
  useEffect(() => {
    const fetchPlayers = async () => {
      const { data } = await supabase.from("Players").select("Name");
      if (data) setPlayers(data.map((p) => p.Name).sort());
    };
    fetchPlayers();
  }, []);

  /* SAVE / UPDATE WORKLOAD */
  const handleSubmit = async () => {
    if (!selectedPlayer || !rpe || !duration) return;

    const dailyLoad = rpe * Number(duration);
    const weeklyLoad = dailyLoad * 7;

    // CHECK IF ENTRY ALREADY EXISTS
    const { data: existing } = await supabase
      .from("workloads")
      .select("id")
      .eq("name", selectedPlayer)
      .eq("date", date)
      .single();

    if (existing) {
      const replace = window.confirm(
        "An entry for this player and date already exists.\nDo you want to replace it?"
      );
      if (!replace) return;

      // UPDATE
      const { error } = await supabase
        .from("workloads")
        .update({
          RPE: rpe,
          duration: Number(duration),
          daily_load: dailyLoad,
          weekly_load: weeklyLoad,
        })
        .eq("id", existing.id);

      if (!error) {
        setMessage("Workload updated successfully ✔");
      }
    } else {
      // INSERT NEW
      const { error } = await supabase.from("workloads").insert([
        {
          name: selectedPlayer,
          date,
          RPE: rpe,
          duration: Number(duration),
          daily_load: dailyLoad,
          weekly_load: weeklyLoad,
        },
      ]);

      if (!error) {
        setMessage("Workload saved successfully ✔");
      }
    }

    setRpe(null);
    setDuration("");
    setActiveRpeInfo(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        paddingTop: HEADER_HEIGHT,
        paddingBottom: BOTTOM_HEIGHT + 40,
      }}
    >
      {/* ========================= HEADER NERO FISSO ========================= */}
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
          alt="Loggan"
          style={{
            height: isDesktop ? 70 : 55,
            width: "auto",
          }}
        />
      </header>

      {/* ========================= CONTENT ========================= */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: isDesktop ? "40px 32px" : "24px 20px",
        }}
      >
        <h2 style={{ marginBottom: 30, fontWeight: 800 }}>
          RPE & Workload Entry
        </h2>

        {/* PLAYER */}
        <div style={{ marginBottom: 30 }}>
          <label style={{ fontWeight: 600 }}>Player</label>
          <div style={playerBox}>
            {selectedPlayer ? (
              <div style={{ ...playerSelected, background: PRIMARY }}>
                {selectedPlayer}
                <button
                  onClick={() => setSelectedPlayer(null)}
                  style={{ ...changeBtn, color: PRIMARY }}
                >
                  Change
                </button>
              </div>
            ) : (
              players.map((p) => (
                <div
                  key={p}
                  onClick={() => setSelectedPlayer(p)}
                  style={playerItem}
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
        <label>RPE (1–10)</label>
        <div style={rpeGrid}>
          {[...Array(10)].map((_, i) => {
            const level = i + 1;
            return (
              <div
                key={level}
                onClick={() => {
                  setRpe(level);
                  setActiveRpeInfo(level);
                }}
                style={{
                  ...rpeBox,
                  background: rpe === level ? PRIMARY : "#fff",
                  color: rpe === level ? "#fff" : "#000",
                  border: `1px solid ${PRIMARY}`,
                }}
              >
                {level}

                {activeRpeInfo === level && (
                  <div style={{ ...tooltip, border: `1px solid ${PRIMARY}` }}>
                    <span>{rpeDescriptions[level]}</span>
                    <FaTimes
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveRpeInfo(null);
                      }}
                      style={{ cursor: "pointer", color: PRIMARY }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* SAVE */}
        <button
          onClick={handleSubmit}
          style={{ ...saveBtn, background: PRIMARY }}
        >
          Save Workload
        </button>

        {message && (
          <p style={{ marginTop: 20, fontWeight: 700, color: PRIMARY }}>
            {message}
          </p>
        )}
      </div>

      {/* ========================= BOTTOM NAV ========================= */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          height: BOTTOM_HEIGHT,
          background: "#000",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <FaHome size={24} onClick={() => navigate("/")} />
        <FaClock size={24} onClick={() => navigate("/workout")} />
        <FaRunning size={24} onClick={() => navigate("/preactivation")} />
        <FaSpa size={24} onClick={() => navigate("/wellness")} />
      </div>
    </div>
  );
}

/* ========================= STYLES ========================= */
const inputStyle = {
  marginTop: 8,
  width: "100%",
  padding: 14,
  borderRadius: 10,
  border: "1px solid #ccc",
  fontSize: 15,
};

const playerBox = {
  marginTop: 10,
  background: "#fff",
  borderRadius: 10,
  border: "1px solid #ddd",
  maxHeight: 200,
  overflowY: "auto",
};

const playerItem = {
  padding: "12px 14px",
  cursor: "pointer",
  borderBottom: "1px solid #eee",
};

const playerSelected = {
  padding: "14px",
  color: "#fff",
  fontWeight: 700,
  textAlign: "center",
};

const changeBtn = {
  marginLeft: 12,
  padding: "4px 10px",
  borderRadius: 6,
  border: "none",
  background: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};

const rpeGrid = {
  marginTop: 14,
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: 12,
  marginBottom: 40,
};

const rpeBox = {
  height: 52,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
  cursor: "pointer",
  position: "relative",
};

const tooltip = {
  position: "absolute",
  bottom: "120%",
  left: "50%",
  transform: "translateX(-50%)",
  background: "#131212",
  color: "#fff",
  padding: 12,
  borderRadius: 10,
  width: 240,
  fontSize: 14,
  lineHeight: 1.4,
  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  zIndex: 10,
  wordBreak: "break-word",
};

const saveBtn = {
  width: "100%",
  padding: 16,
  borderRadius: 12,
  color: "#fff",
  fontWeight: 800,
  border: "none",
  fontSize: 16,
};
