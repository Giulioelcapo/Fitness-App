import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaDumbbell, FaSpa, FaClock } from "react-icons/fa";

export default function Players() {
    const navigate = useNavigate();
    const players = Array.from({ length: 25 }, (_, i) => i + 1);

    const width = window.innerWidth;
    const isTablet = width >= 768;
    const isDesktop = width >= 1024;

    const getColumns = () => {
        if (isDesktop) return 10;
        if (isTablet) return 5;
        return 3;
    };
    const columns = getColumns();

    return (
        <div style={{ padding: 20, paddingBottom: 120 }}>
            <h2 style={{ fontWeight: 700, marginBottom: 20 }}>Players</h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: 15,
                    maxWidth: 1100,
                    margin: "0 auto",
                }}
            >
                {players.map((number) => (
                    <div
                        key={number}
                        onClick={() => navigate(`/players/${number}`)}
                        style={{
                            height: 90,
                            borderRadius: 14,
                            backgroundColor: "#1976d2",
                            color: "#fff",
                            fontSize: 26,
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.06)";
                            e.currentTarget.style.backgroundColor = "#125aa0";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.backgroundColor = "#1976d2";
                        }}
                    >
                        #{number}
                    </div>
                ))}
            </div>

            {/* Bottom Navigation */}
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
                {[{ icon: <FaHome />, screen: "/" },
                { icon: <FaDumbbell />, screen: "/rpe" },
                { icon: <FaSpa />, screen: "/wellness" },
                { icon: <FaClock />, screen: "/workout" }].map((tab, i) => (
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
