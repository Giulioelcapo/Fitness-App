import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaDumbbell,
  FaSpa,
  FaRunning,
  FaClock,
  FaHome,
  FaStar,
  FaUsers,
} from "react-icons/fa";
import clubLogo from "../assets/logo.png";

// Slot sponsorizzazioni
const sponsors = [
  { id: 1, name: "Available Space" },
  { id: 2, name: "Available Space" },
  { id: 3, name: "Available Space" },
  { id: 4, name: "Available Space" },
];

// AdSense component
const AdBanner = () => {
  React.useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-TUO_CLIENT_ID"
        data-ad-slot="TUO_AD_SLOT"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const width = window.innerWidth;
  const iconSize = width > 768 ? 120 : 80;
  const rowMargin = width > 768 ? 50 : 30;

  // Scroll to top
  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buttonStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 20px",
    cursor: "pointer",
  };

  const labelStyle = { marginTop: 10, fontSize: 18, fontWeight: 600 };
  const rowStyle = {
    display: "flex",
    justifyContent: "center",
    marginBottom: rowMargin,
    flexWrap: "wrap",
  };

  const bottomTabStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    backgroundColor: "#555",
    position: "fixed",
    bottom: 0,
    width: "100%",
    color: "#fff",
  };

  return (
    <div style={{ paddingBottom: 150 }}>
      {/* HEADER */}
      <div
        style={{
          padding: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <img src={clubLogo} alt="Club Logo" style={{ width: 130, height: 70 }} />

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 14px",
            border: "1px solid #C9A227",
            borderRadius: 20,
            backgroundColor: "#FAFAFA",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 1,
            color: "#555",
            textTransform: "uppercase",
          }}
        >
          <FaStar size={12} color="#C9A227" />
          <span>Champions of Last Season – Elitettan 2025</span>
        </div>
      </div>

      {/* DASHBOARD BUTTONS */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={rowStyle}>
          <div style={buttonStyle} onClick={() => navigate("/rpe")}>
            <FaDumbbell size={iconSize} color="#1976d2" />
            <span style={labelStyle}>RPE</span>
          </div>

          <div style={buttonStyle} onClick={() => navigate("/wellness")}>
            <FaSpa size={iconSize} color="#1976d2" />
            <span style={labelStyle}>Wellness</span>
          </div>
        </div>

        <div style={rowStyle}>
          <div style={buttonStyle} onClick={() => navigate("/preactivation")}>
            <FaRunning size={iconSize} color="#1976d2" />
            <span style={labelStyle}>Pre-Activation</span>
          </div>

          <div style={buttonStyle} onClick={() => navigate("/workout")}>
            <FaClock size={iconSize} color="#1976d2" />
            <span style={labelStyle}>Workout</span>
          </div>
        </div>

        {/* NEW: PLAYERS */}
        <div style={rowStyle}>
          <div style={buttonStyle} onClick={() => navigate("/players")}>
            <FaUsers size={iconSize} color="#1976d2" />
            <span style={labelStyle}>Players</span>
          </div>
        </div>
      </div>

      {/* ADS */}
      <AdBanner />

      {/* SPONSORS */}
      <div style={{ width: "100%", textAlign: "center", marginTop: 50 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 20 }}>
          Sponsorship Opportunities
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 20,
          }}
        >
          {sponsors.map((slot) => (
            <div
              key={slot.id}
              style={{
                width: 300,
                height: 100,
                border: "2px dashed #bbb",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 600,
                color: "#777",
                backgroundColor: "#f9f9f9",
              }}
            >
              {slot.name}
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM TAB */}
      <div style={bottomTabStyle}>
        <div onClick={handleHomeClick}>
          <FaHome size={26} />
        </div>
        <div onClick={() => navigate("/workout")}>
          <FaClock size={26} />
        </div>
        <div onClick={() => navigate("/preactivation")}>
          <FaRunning size={26} />
        </div>
        <div onClick={() => navigate("/players")}>
          <FaUsers size={26} />
        </div>
        <div onClick={() => navigate("/wellness")}>
          <FaSpa size={26} />
        </div>
      </div>
    </div>
  );
}
