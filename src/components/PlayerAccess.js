import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PlayerAccess() {
    const { number } = useParams();
    const navigate = useNavigate();
    const [code, setCode] = useState("");

    // 🔐 Codici giocatori 1–25
    const playerCodes = {
        1: "AB",
        2: "CD",
        3: "EF",
        4: "GH",
        5: "IJ",
        6: "KL",
        7: "MN",
        8: "OP",
        9: "QR",
        10: "ST",
        11: "UV",
        12: "WX",
        13: "YZ",
        14: "AA",
        15: "BB",
        16: "CC",
        17: "DD",
        18: "EE",
        19: "FF",
        20: "GG",
        21: "HH",
        22: "II",
        23: "JJ",
        24: "KK",
        25: "LL",
    };

    const correctCode = playerCodes[number];

    const handleAccess = () => {
        if (code.toUpperCase() === correctCode) {
            navigate(`/player/${number}/dashboard`);
        } else {
            alert("Wrong code");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2 style={{ fontWeight: 700 }}>Player #{number}</h2>
            <p>Enter your personal code</p>

            <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Two-letter code"
                style={{
                    padding: 12,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    width: "100%",
                    marginBottom: 15,
                    textTransform: "uppercase",
                }}
            />

            <button
                onClick={handleAccess}
                style={{
                    width: "100%",
                    padding: 14,
                    borderRadius: 6,
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    fontWeight: 600,
                    cursor: "pointer",
                }}
            >
                Enter
            </button>
        </div>
    );
}
