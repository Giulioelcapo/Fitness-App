import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaDumbbell, FaSpa, FaClock } from "react-icons/fa";
import loggan from "../assets/loggan.png";

export default function Players() {
    const navigate = useNavigate();
    const HEADER_HEIGHT = 130;
    const BOTTOM_HEIGHT = 72;

    const [players, setPlayers] = useState(
        Array.from({ length: 35 }, (_, i) => ({ number: i + 1, code: "" }))
    );

    const playerCodes = {
        1: "AB", 2: "CD", 3: "EF", 4: "GH", 5: "IJ",
        6: "KL", 7: "MN", 8: "OP", 9: "QR", 10: "ST",
        11: "UV", 12: "WX", 13: "YZ", 14: "AA", 15: "BB",
        16: "CC", 17: "DD", 18: "EE", 19: "FF", 20: "GG",
        21: "HH", 22: "II", 23: "JJ", 24: "KK", 25: "LL",
        26: "MM", 27: "NN", 28: "OO", 29: "PP", 30: "QQ",
        31: "RR", 32: "SS", 33: "TT", 34: "UU", 35: "VV",
    };

    const handleInputChange = (num, value) => {
        setPlayers((prev) =>
            prev.map((p) => (p.number === num ? { ...p, code: value.toUpperCase() } : p))
        );
    };

    const handleAccess = (num) => {
        const player = players.find((p) => p.number === num);
        if (player.code === playerCodes[num]) {
            navigate(`/player/${num}/dashboard`);
        } else {
            alert("Wrong code");
        }
    };

    return (
        <div style={{ minHeight: "100vh", paddingTop: HEADER_HEIGHT, paddingBottom: BOTTOM_HEIGHT + 20, background: "#f4f6f8" }}>

            {/* ========================= HEADER ========================= */}
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
                <img src={loggan} alt="Logo" style={{ height: 70, width: "auto" }} />
            </header>

            <h2 style={{ fontWeight: 700, marginBottom: 20 }}>Select Player</h2>

            {/* ========================= GRID GIOCATORI ========================= */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                    gap: 12,
                    maxHeight: "70vh",
                    overflowY: "auto",
                    paddingRight: 6,
                }}
            >
                {players.map((p) => (
                    <div
                        key={p.number}
                        style={{
                            padding: 16,
                            borderRadius: 12,
                            backgroundColor: "#00A86B",
                            color: "#fff",
                            fontWeight: 600,
                            textAlign: "center",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        }}
                    >
                        <h4>Player #{p.number}</h4>
                        <input
                            type="password"
                            placeholder="Code"
                            value={p.code}
                            onChange={(e) => handleInputChange(p.number, e.target.value)}
                            style={{
                                marginTop: 8,
                                padding: 8,
                                width: "100%",
                                borderRadius: 6,
                                border: "1px solid #ccc",
                                textTransform: "uppercase",
                            }}
                        />
                        <button
                            onClick={() => handleAccess(p.number)}
                            style={{
                                marginTop: 8,
                                padding: 8,
                                width: "100%",
                                borderRadius: 6,
                                border: "none",
                                backgroundColor: "#ff9800",
                                color: "#000",
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            Enter
                        </button>
                    </div>
                ))}
            </div>

            {/* ========================= BOTTOM NAV ========================= */}
            <div
                style={{
                    height: BOTTOM_HEIGHT,
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    backgroundColor: "#000000",
                    position: "fixed",
                    bottom: 0,
                    width: "100%",
                    zIndex: 1000,
                }}
            >
                {[FaHome, FaDumbbell, FaSpa, FaClock].map((Icon, i) => (
                    <button
                        key={i}
                        onClick={() => navigate("/dashboard")}
                        style={{ background: "none", border: "none", color: "#fff", fontSize: 26 }}
                    >
                        <Icon />
                    </button>
                ))}
            </div>
        </div>
    );
}
