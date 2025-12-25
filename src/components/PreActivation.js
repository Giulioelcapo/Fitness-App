import React, { useState } from "react";
import { FaHome, FaDumbbell, FaSpa, FaClock, FaUser } from "react-icons/fa";
import { GiSoccerField, GiHand } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

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
   SESSION IMAGES
========================= */
const sessionImages = {
    "MD+1": "/assets/MD1.png",
    "MD+2": "/assets/MD2.png",
    "MD+3": "/assets/MD3.png",
    "MD-3": "/assets/MD-3.png",
    "MD-2": "/assets/MD-2.png",
    "MD-1": "/assets/MD-1.png",
    "ROUTINES WEEK": "/assets/MD.png",
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

    const sessionData = selectedSession && role ? trainingPlan[role][selectedSession] : null;

    const isTablet = window.innerWidth >= 768;

    return (
        <div style={{ paddingBottom: 90 }}>
            <h2 style={{ fontSize: isTablet ? 26 : 22, fontWeight: 700, marginBottom: 20 }}>
                PRE-ACTIVATION ROUTINE
            </h2>

            {/* OUTFIELD */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginBottom: 15 }}>
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
                        <span style={{ marginTop: 8, fontWeight: 600, fontSize: isTablet ? 16 : 14 }}>
                            {session}
                        </span>
                    </div>
                ))}
            </div>

            {/* GOALKEEPER */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 15 }}>
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
                    <span style={{ marginTop: 8, fontWeight: 600, fontSize: isTablet ? 16 : 14 }}>
                        GOALKEEPER
                    </span>
                </div>
            </div>

            {/* MODAL */}
            {selectedSession && sessionData && (
                <div
                    onClick={closeModal}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflowY: "auto",
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
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                            <h3 style={{ fontSize: isTablet ? 20 : 18, fontWeight: 600 }}>
                                {role.toUpperCase()} – {selectedSession}
                            </h3>
                            <button onClick={closeModal} style={{ cursor: "pointer", fontSize: 18 }}>X</button>
                        </div>

                        {sessionImages[selectedSession] && (
                            <img
                                src={sessionImages[selectedSession]}
                                alt={selectedSession}
                                style={{ width: "100%", height: isTablet ? 240 : 180, marginBottom: 15, objectFit: "contain" }}
                            />
                        )}

                        {sessionData.meta && (
                            <div style={{ backgroundColor: "#f2f4f7", padding: 12, borderRadius: 10, marginBottom: 15 }}>
                                <p>Objective: {sessionData.meta.objective}</p>
                                <p>Intensity: {sessionData.meta.intensity}</p>
                                <p>Fatigue: {sessionData.meta.fatigue}</p>
                            </div>
                        )}

                        {sessionData.blocks.map((block, i) => (
                            <div key={i} style={{ marginBottom: 15 }}>
                                <p style={{ fontWeight: 700, marginBottom: 6, fontSize: 14, color: "#1976d2" }}>{block.title}</p>
                                {block.items.map((item, idx) => (
                                    <p key={idx} style={{ fontSize: 15, marginBottom: 6 }}>• {item}</p>
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
                {[
                    { icon: <FaHome />, screen: "/" },          // Dashboard
                    { icon: <FaDumbbell />, screen: "/rpe" },
                    { icon: <FaSpa />, screen: "/wellness" },
                    { icon: <FaClock />, screen: "/workout" },
                    { icon: <FaUser />, screen: "/profile" },
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
