import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaDumbbell,
  FaSpa,
  FaRunning,
  FaClock,
  FaHome,
  FaUsers,
} from "react-icons/fa";

import loggan from "../assets/loggan.png";

export default function Dashboard() {
  const navigate = useNavigate();
  const width = window.innerWidth;

  const HEADER_HEIGHT = 130;
  const BOTTOM_HEIGHT = 70;

  const iconSize = width > 768 ? 120 : 80;
  const rowMargin = width > 768 ? 50 : 30;

  const buttonStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 20px",
    cursor: "pointer",
  };

  const labelStyle = {
    marginTop: 10,
    fontSize: width > 768 ? 18 : 16,
    fontWeight: 600,
  };

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
    height: BOTTOM_HEIGHT,
    backgroundColor: "#000",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    color: "#fff",
    zIndex: 1000,
  };

  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        paddingTop: HEADER_HEIGHT,
        paddingBottom: BOTTOM_HEIGHT + 40,
      }}
    >
      {/* =========================
          HEADER NERO FISSO
      ========================= */}
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
            height: width > 768 ? 70 : 55,
            width: "auto",
          }}
        />
      </header>

      {/* =========================
          DASHBOARD BUTTONS
      ========================= */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        {/* ROW 1 */}
        <div style={rowStyle}>
          <div style={buttonStyle} onClick={() => navigate("/rpe")}>
            <FaDumbbell size={iconSize} />
            <span style={labelStyle}>RPE</span>
          </div>

          <div style={buttonStyle} onClick={() => navigate("/wellness")}>
            <FaSpa size={iconSize} />
            <span style={labelStyle}>Wellness</span>
          </div>
        </div>

        {/* ROW 2 */}
        <div style={rowStyle}>
          <div style={buttonStyle} onClick={() => navigate("/preactivation")}>
            <FaRunning size={iconSize} />
            <span style={labelStyle}>Pre-Activation</span>
          </div>

          <div style={buttonStyle} onClick={() => navigate("/workout")}>
            <FaClock size={iconSize} />
            <span style={labelStyle}>Workout</span>
          </div>
        </div>

        {/* ROW 3 */}
        <div style={rowStyle}>
          <div style={buttonStyle} onClick={() => navigate("/players")}>
            <FaUsers size={iconSize} />
            <span style={labelStyle}>Players</span>
          </div>
        </div>
      </div>

      {/* =========================
          BOTTOM NAV
      ========================= */}
      <div style={bottomTabStyle}>
        <FaHome
          size={24}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
        />
        <FaClock size={24} onClick={() => navigate("/workout")} />
        <FaRunning size={24} onClick={() => navigate("/preactivation")} />
        <FaUsers size={24} onClick={() => navigate("/players")} />
        <FaSpa size={24} onClick={() => navigate("/wellness")} />
      </div>
    </div>
  );
}
