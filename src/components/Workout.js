import React, { useState, useEffect, useRef } from "react";
import { FaHome, FaClock, FaRunning, FaSpa, FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Workout() {
    const navigate = useNavigate();

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
                        border: "1px solid #1976d2",
                        padding: "8px 14px",
                        marginRight: 8,
                        borderRadius: 6,
                        backgroundColor: selected === item ? "#1976d2" : "transparent",
                        color: selected === item ? "#fff" : "#000",
                        cursor: "pointer",
                    }}
                >
                    {item}
                </button>
            ))}
        </div>
    );

    const progressPercent = Math.min((elapsedSeconds.current / totalDuration) * 100, 100);

    return (
        <div style={{ padding: 20, paddingBottom: 120 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 20 }}>Workout Programs</h2>

            {/* WORKOUT LIST */}
            {workouts.map((item) => (
                <div
                    key={item.id}
                    onClick={() => handleWorkoutPress(item)}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: 14,
                        border: "1px solid #ccc",
                        borderRadius: 8,
                        marginBottom: 10,
                        cursor: "pointer",
                    }}
                >
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 18 }}>{item.name}</div>
                        <div style={{ fontSize: 12, color: "#ff8f00", fontWeight: 700 }}>
                            COMING SOON · PREMIUM CONTENT
                        </div>
                    </div>
                    <FaLock color="#1976d2" size={24} />
                </div>
            ))}

            {/* TIMER SETUP */}
            <h3 style={{ fontWeight: 600, marginTop: 20 }}>Timer Setup</h3>
            <div>Work Time</div>
            {renderMenu([15, 30, 45, 60], workTime, setWorkTime)}
            <div>Rest Time</div>
            {renderMenu([10, 15, 20, 30], restTime, setRestTime)}
            <div>Reps</div>
            {renderMenu([1, 2, 3, 4, 5], reps, setReps)}

            <button
                onClick={handlePlay}
                style={{
                    backgroundColor: "#1976d2",
                    padding: 16,
                    borderRadius: 10,
                    marginTop: 20,
                    color: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                }}
            >
                START TIMER
            </button>

            {/* PREMIUM MODAL */}
            {showPremiumModal && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
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
                        <h3 style={{ fontWeight: 700, marginBottom: 10 }}>Premium Content</h3>
                        <p style={{ marginBottom: 20 }}>
                            This workout is part of the Premium programs.<br />
                            The content will be available shortly.
                        </p>
                        <button
                            onClick={() => setShowPremiumModal(false)}
                            style={{
                                backgroundColor: "#1976d2",
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

            {/* FULLSCREEN TIMER */}
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
                    }}
                >
                    <div style={{ fontSize: 28 }}>
                        {phase.toUpperCase()} {currentRep}/{reps}
                    </div>
                    <div style={{ fontSize: 96, fontWeight: 700 }}>{timeLeft}s</div>

                    <div
                        style={{
                            width: "90%",
                            height: 14,
                            backgroundColor: "#333",
                            borderRadius: 7,
                            margin: "30px 0",
                        }}
                    >
                        <div
                            style={{
                                width: `${progressPercent}%`,
                                height: "100%",
                                borderRadius: 7,
                                backgroundColor: phase === "work" ? "#1976d2" : "#ff8f00",
                            }}
                        />
                    </div>

                    <div style={{ display: "flex", gap: 10 }}>
                        <button
                            onClick={handlePause}
                            style={{
                                padding: 14,
                                borderRadius: 8,
                                backgroundColor: "#1976d2",
                                color: "#fff",
                                fontWeight: 700,
                                cursor: "pointer",
                            }}
                        >
                            {isPaused ? "Resume" : "Pause"}
                        </button>
                        <button
                            onClick={handleStop}
                            style={{
                                padding: 14,
                                borderRadius: 8,
                                backgroundColor: "#d32f2f",
                                color: "#fff",
                                fontWeight: 700,
                                cursor: "pointer",
                            }}
                        >
                            Stop
                        </button>
                    </div>
                </div>
            )}

            {/* BOTTOM NAV */}
            {!showTimer && (
                <div
                    style={{
                        position: "fixed",
                        bottom: 0,
                        width: "100%",
                        height: 70,
                        backgroundColor: "#555",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        color: "#fff",
                    }}
                >
                    <button
                        onClick={() => navigate("/")}
                        style={{ background: "transparent", border: "none", color: "#fff", fontSize: 26, cursor: "pointer" }}
                    >
                        <FaHome />
                    </button>
                    <button
                        onClick={() => navigate("/rpe")}
                        style={{ background: "transparent", border: "none", color: "#fff", fontSize: 26, cursor: "pointer" }}
                    >
                        <FaClock />
                    </button>
                    <button
                        onClick={() => navigate("/wellness")}
                        style={{ background: "transparent", border: "none", color: "#fff", fontSize: 26, cursor: "pointer" }}
                    >
                        <FaSpa />
                    </button>
                    <button
                        onClick={() => navigate("/preactivation")}
                        style={{ background: "transparent", border: "none", color: "#fff", fontSize: 26, cursor: "pointer" }}
                    >
                        <FaRunning />
                    </button>
                    <button
                        onClick={() => navigate("/profile")}
                        style={{ background: "transparent", border: "none", color: "#fff", fontSize: 26, cursor: "pointer" }}
                    >
                        <FaUser />
                    </button>
                </div>
            )}
        </div>
    );
}
