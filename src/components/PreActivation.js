import React, { useState } from "react";
import { FaHome, FaDumbbell, FaSpa, FaClock, FaUser } from "react-icons/fa";
import { GiSoccerField, GiHand } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

/* =========================
   IMAGE IMPORTS (OBBLIGATORI)
========================= */
import MDp1 from "../assets/MD+1.png";
import MDp2 from "../assets/MD+2.png";
import MDp3 from "../assets/MD+3.png";
import MDm1 from "../assets/MD-1.png";
import MDm2 from "../assets/MD-2.png";
import MDm3 from "../assets/MD-3.png";
import MDGK from "../assets/MD.png";

/* =========================
   TRAINING CONFIGURATION
========================= */
const trainingPlan = {
    outfield: {
        "MD+1": {
            meta: { objective: "Recovery & reset", intensity: "Low", fatigue: "None" },
            blocks: [
                {
                    title: "PREPARATION",
                    items: [
                        "Foam roll – major areas (5’)",
                        "Ground-based mobility",
                        "4–5 total-body activation (5’)",
                    ],
                },
                {
                    title: "NEUROMUSCULAR",
                    items: [
                        "Preventive strength",
                        "Light neuromuscular work",
                        "Rotational chain",
                        "1–2 exercises per category",
                    ],
                },
            ],
        },
        "MD+2": {
            meta: { objective: "Reconditioning", intensity: "Moderate", fatigue: "Controlled" },
            blocks: [
                {
                    title: "PREPARATION",
                    items: [
                        "Foam roll – major areas (5’)",
                        "Ground mobility",
                        "4–5 activation exercises (5’)",
                    ],
                },
                {
                    title: "MOVEMENT",
                    items: [
                        "Speed mechanics",
                        "Acceleration",
                        "Deceleration",
                        "Recovery leg stiffness",
                        "1–2 exercises per category",
                    ],
                },
            ],
        },
        "MD+3": {
            meta: { objective: "Load progression", intensity: "Moderate", fatigue: "Moderate" },
            blocks: [
                {
                    title: "PREPARATION",
                    items: [
                        "Foam roll – major areas (5’)",
                        "Ground mobility",
                        "4–5 activation exercises (5’)",
                    ],
                },
                {
                    title: "MOVEMENT",
                    items: [
                        "Speed mechanics",
                        "Acceleration",
                        "Deceleration",
                        "Recovery leg stiffness",
                        "1–2 exercises per category",
                    ],
                },
            ],
        },
        "MD-3": {
            meta: { objective: "Prepare without fatigue", intensity: "Low–Moderate", fatigue: "Minimal" },
            blocks: [
                {
                    title: "PREPARATION",
                    items: [
                        "Foam roll – major areas (5’)",
                        "Ground-based mobility",
                        "4–5 total-body activation (5’)",
                    ],
                },
                {
                    title: "MOVEMENT & PERFORMANCE",
                    items: [
                        "Running mechanics",
                        "Landing mechanics",
                        "Hip extensor activation",
                        "Submaximal top-speed exposure",
                        "1–2 exercises per category",
                    ],
                },
            ],
        },
        "MD-2": {
            meta: { objective: "Neuromuscular readiness", intensity: "Moderate", fatigue: "Controlled" },
            blocks: [
                {
                    title: "PERFORMANCE",
                    items: [
                        "Power & reactivity",
                        "Sprint exposure",
                        "Neuromuscular activation",
                    ],
                },
            ],
        },
        "MD-1": {
            meta: { objective: "Prime for match", intensity: "Low", fatigue: "None" },
            blocks: [
                {
                    title: "PREPARATION",
                    items: [
                        "Foam roll – major areas (5’)",
                        "Ground mobility",
                        "4–5 activation exercises (5’)",
                    ],
                },
                {
                    title: "PRIMING",
                    items: [
                        "Short activation",
                        "Reaction & coordination",
                        "Low-volume sprints",
                    ],
                },
            ],
        },
    },
    goalkeeper: {
        "ROUTINES WEEK": {
            meta: { objective: "Technical & joint preparation", intensity: "Low–Moderate", fatigue: "Minimal" },
            blocks: [
                {
                    title: "PREPARATION",
                    items: [
                        "Foam roll – major areas (5’)",
                        "Ground mobility",
                        "4–5 activation exercises (5’)",
                    ],
                },
                {
                    title: "GOALKEEPER SPECIFIC",
                    items: [
                        "Shoulder prevention",
                        "Footwork basic patterns",
                        "Hand–eye coordination",
                    ],
                },
            ],
        },
    },
};

/* =========================
   SESSION IMAGES (CHIAVI IDENTICHE)
========================= */
const sessionImages = {
    "MD+1": MDp1,
    "MD+2": MDp2,
    "MD+3": MDp3,
    "MD-3": MDm3,
    "MD-2": MDm2,
    "MD-1": MDm1,
    "ROUTINES WEEK": MDGK,
};

/* =========================
   COMPONENT
========================= */
export default function PreActivation() {
    const navigate = useNavigate();
    const [selectedSession, setSelectedSession] = useState(null);
    const [role, setRole] = useState(null);

    const openModal = (session, selectedRole) => {
        setSelectedSession(session);
        setRole(selectedRole);
    };

    const closeModal = () => {
        setSelectedSession(null);
        setRole(null);
    };

    const sessionData =
        selectedSession && role ? trainingPlan[role][selectedSession] : null;

    const isTablet = window.innerWidth >= 768;

    return (
        <div style={{ paddingBottom: 90 }}>
            <h2 style={{ fontSize: isTablet ? 26 : 22, fontWeight: 700, marginBottom: 20 }}>
                PRE-ACTIVATION ROUTINE
            </h2>

            {/* OUTFIELD */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {Object.keys(trainingPlan.outfield).map((session) => (
                    <div
                        key={session}
                        onClick={() => openModal(session, "outfield")}
                        style={{
                            width: isTablet ? 150 : 120,
                            height: isTablet ? 150 : 120,
                            backgroundColor: "#f7f7f7",
                            margin: 10,
                            borderRadius: 14,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                    >
                        <GiSoccerField size={isTablet ? 48 : 40} color="#1976d2" />
                        <span style={{ marginTop: 8, fontWeight: 600 }}>{session}</span>
                    </div>
                ))}
            </div>

            {/* GOALKEEPER */}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                    onClick={() => openModal("ROUTINES WEEK", "goalkeeper")}
                    style={{
                        width: isTablet ? 150 : 120,
                        height: isTablet ? 150 : 120,
                        backgroundColor: "#eef1f5",
                        margin: 10,
                        borderRadius: 14,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                    }}
                >
                    <GiHand size={isTablet ? 48 : 40} color="#1976d2" />
                    <span style={{ marginTop: 8, fontWeight: 600 }}>GOALKEEPER</span>
                </div>
            </div>

            {/* MODAL */}
            {selectedSession && sessionData && (
                <div
                    onClick={closeModal}
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.4)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: isTablet ? "70%" : "92%",
                            maxHeight: "85%",
                            backgroundColor: "#fff",
                            borderRadius: 16,
                            padding: 20,
                            overflowY: "auto",
                        }}
                    >
                        <h3>{role.toUpperCase()} – {selectedSession}</h3>

                        <img
                            src={sessionImages[selectedSession]}
                            alt={selectedSession}
                            style={{ width: "100%", maxHeight: 240, objectFit: "contain", marginBottom: 15 }}
                        />

                        {sessionData.blocks.map((block, i) => (
                            <div key={i}>
                                <strong>{block.title}</strong>
                                {block.items.map((item, idx) => (
                                    <p key={idx}>• {item}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}

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
                {[FaHome, FaDumbbell, FaSpa, FaClock, FaUser].map((Icon, i) => (
                    <button key={i} onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "#fff", fontSize: 26 }}>
                        <Icon />
                    </button>
                ))}
            </div>
        </div>
    );
}
