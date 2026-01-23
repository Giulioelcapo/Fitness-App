import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaClock, FaRunning, FaSpa, FaLock } from "react-icons/fa";
import loggan from "../assets/loggan.png";

export default function Workout() {
    const navigate = useNavigate();
    const HEADER_HEIGHT = 130;
    const BOTTOM_HEIGHT = 72;

    /* ================= PREMIUM ACCESS ================= */
    const [hasAccess, setHasAccess] = useState(false); // FUTURA IAP

    /* ================= WORKOUT LIST ================= */
    const workouts = [
        { id: "1", name: "Power", premium: true, status: "coming_soon" },
        { id: "2", name: "Speed", premium: true, status: "coming_soon" },
        { id: "3", name: "Mobility", premium: true, status: "coming_soon" },
        { id: "4", name: "Acceleration", premium: true, status: "coming_soon" },
        { id: "5", name: "Deceleration", premium: true, status: "coming_soon" },
    ];

    /* ================= TIMER SETTINGS ================= */
    const [workTime, setWorkTime] = useState(30);
    const [restTime, setRestTime] = useState(15);
    const [reps, setReps] = useState(3);

    /* ================= TIMER STATE ================= */
    const [phase, setPhase] = useState("work");
    const [currentRep, setCurrentRep] = useState(1);
    const [timeLeft, setTimeLeft] = useState(workTime);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [showTimer, setShowTimer] = useState(false);

    /* ================= MODALS ================= */
    const [showPremiumModal, setShowPremiumModal] = useState(false);

    /* ================= PROGRESS ================= */
    const elapsedSeconds = useRef(0);
    const totalDuration = reps * (workTime + restTime);

    /* ================= TIMER LOGIC ================= */
    useEffect(() => {
        if (!isRunning || isPaused) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === 1) {
                    if (phase === "work") {
                        setPhase("rest");
                        return restTime;
                    }
                    if (currentRep < reps) {
                        setCurrentRep((r) => r + 1);
                        setPhase("work");
                        return workTime;
                    }
                    handleStop();
                    return workTime;
                }
                return prev - 1;
            });
            elapsedSeconds.current += 1;
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, isPaused, phase, currentRep, workTime, restTime, reps]);

    /* ================= HANDLERS ================= */
    const handlePlay = () => {
        elapsedSeconds.current = 0;
        setPhase("work");
        setCurrentRep(1);
        setTimeLeft(workTime);
        setIsRunning(true);
        setIsPaused(false);
        setShowTimer(true);
    };

    const handlePause = () => setIsPaused((p) => !p);

    const handleStop = () => {
        setIsRunning(false);
        setIsPaused(false);
        setShowTimer(false);
        setPhase("work");
        setCurrentRep(1);
        setTimeLeft(workTime);
        elapsedSeconds.current = 0;
    };

    const handleWorkoutPress = (item) => {
        if (item.status === "coming_soon" || (item.premium && !hasAccess)) {
            setShowPremiumModal(true);
            return;
        }
    };

    const renderMenu = (data, selected, setter) => (
        <div style={{ display: "flex", overflowX: "auto", marginBottom: 10 }}>
            {data.map((item) => (
                <button
                    key={item}
                    onClick={() => setter(item)}
                    style={{
                        border: "1px solid #00A86B",
                        padding: "8px 14px",
                        marginRight: 8,
                        borderRadius: 6,
                        backgroundColor: selected === item ? "#00A86B" : "transparent",
                        color: selected === item ? "#fff" : "#000",
                        cursor: "pointer",
                        fontWeight: 600,
                    }}
                >
                    {item}
                </button>
            ))}
        </div>
    );

    const progressPercent = Math.min((elapsedSeconds.current / totalDuration) * 100, 100);

    return (
        <div style={{ minHeight: "100vh", paddingTop: HEADER_HEIGHT, paddingBottom: BOTTOM_HEIGHT + 20, backgroundColor: "#f4f6f8", paddingLeft: 20, paddingRight: 20 }}>
            {/* ================= HEADER ================= */}
            <header style={{ position: "fixed", top: 0, left: 0, width: "100%", height: HEADER_HEIGHT, backgroundColor: "#000", display: "flex", alignItems: "center", padding: "0 32px", zIndex: 1000 }}>
                <img src={loggan} alt="Logo" style={{ height: 70, width: "auto" }} />
            </header>

            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 20, textAlign: "center", color: "#00A86B" }}>
                WORKOUT PROGRAMS
            </h2>

            {/* ================= WORKOUT LIST ================= */}
            {workouts.map((item) => (
                <div
                    key={item.id}
                    onClick={() => handleWorkoutPress(item)}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 14,
                        borderRadius: 12,
                        marginBottom: 10,
                        cursor: "pointer",
                        backgroundColor: "#00A86B",
                        color: "#fff",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                        transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 18 }}>{item.name}</div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "#ff8f00" }}>
                            COMING SOON · PREMIUM
                        </div>
                    </div>
                    <FaLock size={24} />
                </div>
            ))}

            {/* ================= TIMER SETUP ================= */}
            <h3 style={{ fontWeight: 700, marginTop: 20, color: "#00A86B" }}>Timer Setup</h3>
            <div>Work Time</div>
            {renderMenu([15, 30, 45, 60], workTime, setWorkTime)}
            <div>Rest Time</div>
            {renderMenu([10, 15, 20, 30], restTime, setRestTime)}
            <div>Reps</div>
            {renderMenu([1, 2, 3, 4, 5], reps, setReps)}

            <button
                onClick={handlePlay}
                style={{
                    backgroundColor: "#00A86B",
                    padding: 16,
                    borderRadius: 10,
                    marginTop: 20,
                    color: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                    width: "100%",
                }}
            >
                START TIMER
            </button>

            {/* ================= PREMIUM MODAL ================= */}
            {showPremiumModal && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: 24,
                            borderRadius: 14,
                            textAlign: "center",
                            width: "80%",
                        }}
                    >
                        <h3 style={{ fontWeight: 700, marginBottom: 10, color: "#00A86B" }}>Premium Content</h3>
                        <p style={{ marginBottom: 20 }}>
                            This workout is part of the Premium programs.<br />
                            The content will be available shortly.
                        </p>
                        <button
                            onClick={() => setShowPremiumModal(false)}
                            style={{
                                backgroundColor: "#00A86B",
                                color: "#fff",
                                padding: "10px 20px",
                                borderRadius: 8,
                                fontWeight: 700,
                                cursor: "pointer",
                            }}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            {/* ================= FULLSCREEN TIMER ================= */}
            {showTimer && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "#000",
                        color: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 10000,
                    }}
                >
                    <div style={{ fontSize: 28 }}>{phase.toUpperCase()} {currentRep}/{reps}</div>
                    <div style={{ fontSize: 96, fontWeight: 700 }}>{timeLeft}s</div>

                    <div style={{ width: "100%", height: 14, backgroundColor: "#333", borderRadius: 7, margin: "30px 0" }}>
                        <div
                            style={{
                                width: `${progressPercent}%`,
                                height: "100%",
                                borderRadius: 7,
                                backgroundColor: phase === "work" ? "#00A86B" : "#ff8f00",
                            }}
                        />
                    </div>

                    <div style={{ display: "flex", gap: 10 }}>
                        <button
                            onClick={handlePause}
                            style={{ padding: 14, borderRadius: 8, backgroundColor: "#00A86B", color: "#fff", fontWeight: 700, cursor: "pointer" }}
                        >
                            {isPaused ? "Resume" : "Pause"}
                        </button>
                        <button
                            onClick={handleStop}
                            style={{ padding: 14, borderRadius: 8, backgroundColor: "#d32f2f", color: "#fff", fontWeight: 700, cursor: "pointer" }}
                        >
                            Stop
                        </button>
                    </div>
                </div>
            )}

            {/* ================= BOTTOM NAV ================= */}
            {!showTimer && (
                <div style={{ position: "fixed", bottom: 0, width: "100%", height: BOTTOM_HEIGHT, backgroundColor: "#000", display: "flex", justifyContent: "space-around", alignItems: "center", zIndex: 1000 }}>
                    <button onClick={() => navigate("/")} style={{ background: "transparent", border: "none", color: "#fff", fontSize: 26, cursor: "pointer" }}><FaHome /></button>
                    <button onClick={() => navigate("/rpe")} style={{ background: "transparent", border: "none", color: "#fff", fontSize: 26, cursor: "pointer" }}><FaClock /></button>
                    <button onClick={() => navigate("/wellness")} style={{ background: "transparent", border: "none", color: "#fff", fontSize: 26, cursor: "pointer" }}><FaSpa /></button>
                    <button onClick={() => navigate("/preactivation")} style={{ background: "transparent", border: "none", color: "#fff", fontSize: 26, cursor: "pointer" }}><FaRunning /></button>
                </div>
            )}
        </div>
    );
}
