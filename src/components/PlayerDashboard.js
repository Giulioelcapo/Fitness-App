import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis,
    Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";
import { FaHome, FaDumbbell, FaSpa, FaClock } from "react-icons/fa";
import { supabase } from "../supabaseClient";

export default function PlayerDashboard() {
    const { number } = useParams();
    const navigate = useNavigate();

    const [playerName, setPlayerName] = useState(null);
    const [playerWorkoutTable, setPlayerWorkoutTable] = useState(null);
    const [workoutDay, setWorkoutDay] = useState(1);
    const [workoutData, setWorkoutData] = useState([]);

    const [rpeData, setRpeData] = useState([]);
    const [teamAvgRPE, setTeamAvgRPE] = useState([]);
    const [wellnessData, setWellnessData] = useState([]);
    const [teamAvgWellness, setTeamAvgWellness] = useState([]);

    const [tab, setTab] = useState("RPE");
    const [days, setDays] = useState(14);
    const [loading, setLoading] = useState(true);

    /* ========================== GET PLAYER NAME & WORKOUT TABLE ========================== */
    useEffect(() => {
        const fetchPlayer = async () => {
            const { data, error } = await supabase
                .from("Players")
                .select("Name, Workout")
                .eq("Number", Number(number))
                .single();

            if (!error && data) {
                setPlayerName(data.Name);
                setPlayerWorkoutTable(data.Workout); // es. "workout1"
            } else {
                console.error("Errore fetching player info:", error);
            }
        };
        fetchPlayer();
    }, [number]);

    /* ========================== FETCH RPE & WELLNESS ========================== */
    useEffect(() => {
        if (!playerName) return;

        const fetchData = async () => {
            setLoading(true);
            const fromDate = new Date();
            fromDate.setDate(fromDate.getDate() - days);

            // --- PLAYER RPE ---
            const { data: playerRPE } = await supabase
                .from("workloads")
                .select("date, RPE, daily_load, weekly_load, ACWR")
                .eq("name", playerName)
                .gte("date", fromDate.toISOString())
                .order("date", { ascending: true });

            // --- TEAM RPE ---
            const { data: teamRPE } = await supabase
                .from("workloads")
                .select("date, RPE, daily_load, weekly_load, ACWR")
                .gte("date", fromDate.toISOString());

            const groupedRPE = {};
            (teamRPE || []).forEach((row) => {
                if (!groupedRPE[row.date]) groupedRPE[row.date] = [];
                groupedRPE[row.date].push(row);
            });
            const teamRPEAvg = Object.keys(groupedRPE).map((date) => {
                const arr = groupedRPE[date];
                const n = arr.length;
                return {
                    date,
                    RPE: arr.reduce((a, b) => a + b.RPE, 0) / n,
                    daily_load: arr.reduce((a, b) => a + b.daily_load, 0) / n,
                    weekly_load: arr.reduce((a, b) => a + b.weekly_load, 0) / n,
                    ACWR: arr.reduce((a, b) => a + b.ACWR, 0) / n,
                };
            });

            // --- PLAYER WELLNESS ---
            const { data: playerWellness } = await supabase
                .from("MonitoringData")
                .select("date, stress, food_and_drink, sleep_hours, soreness_joint, soreness_muscle")
                .eq("name", playerName)
                .gte("date", fromDate.toISOString())
                .order("date", { ascending: true });

            // --- TEAM WELLNESS ---
            const { data: teamWellness } = await supabase
                .from("MonitoringData")
                .select("date, stress, food_and_drink, sleep_hours, soreness_joint, soreness_muscle")
                .gte("date", fromDate.toISOString());

            const groupedWellness = {};
            (teamWellness || []).forEach((row) => {
                if (!groupedWellness[row.date]) groupedWellness[row.date] = [];
                groupedWellness[row.date].push(row);
            });
            const teamWellnessAvg = Object.keys(groupedWellness).map((date) => {
                const arr = groupedWellness[date];
                const n = arr.length;
                return {
                    date,
                    stress: arr.reduce((a, b) => a + b.stress, 0) / n,
                    food_and_drink: arr.reduce((a, b) => a + b.food_and_drink, 0) / n,
                    sleep_hours: arr.reduce((a, b) => a + b.sleep_hours, 0) / n,
                    soreness_joint: arr.reduce((a, b) => a + b.soreness_joint, 0) / n,
                    soreness_muscle: arr.reduce((a, b) => a + b.soreness_muscle, 0) / n,
                };
            });

            setRpeData(playerRPE || []);
            setTeamAvgRPE(teamRPEAvg || []);
            setWellnessData(playerWellness || []);
            setTeamAvgWellness(teamWellnessAvg || []);
            setLoading(false);
        };

        fetchData();
    }, [playerName, days]);

    /* ========================== FETCH WORKOUT DATA ========================== */
    useEffect(() => {
        if (!playerWorkoutTable) return;

        const fetchWorkout = async () => {
            try {
                const { data, error } = await supabase
                    .from(playerWorkoutTable) // es. workout1
                    .select("exercise, reps, set, weight, codice") // A, B, C ...
                    .eq("day", workoutDay)
                    .order("codice", { ascending: true }); // ORDINAMENTO secondo codice

                if (error) {
                    console.error("Errore fetch workout:", error);
                    setWorkoutData([]);
                    return;
                }

                setWorkoutData(data || []);
            } catch (err) {
                console.error("Errore fetch workout:", err);
                setWorkoutData([]);
            }
        };

        fetchWorkout();
    }, [playerWorkoutTable, workoutDay]);

    if (loading) return <div style={{ padding: 20 }}>Loading data...</div>;

    const hasRPEData = Array.isArray(rpeData) && rpeData.length > 0;
    const hasWellnessData = Array.isArray(wellnessData) && wellnessData.length > 0;

    return (
        <div style={{ padding: 20, paddingBottom: 120 }}>
            <h2>#{number}</h2>

            {/* TAB SELECTOR */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                {["RPE", "Wellness", "Workout"].map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        style={{
                            padding: "8px 16px",
                            borderRadius: 12,
                            border: "none",
                            background: tab === t ? "#1976d2" : "#ddd",
                            color: tab === t ? "#fff" : "#000",
                            fontWeight: 600,
                        }}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* TIME FILTER */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                {[7, 14, 28].map((d) => (
                    <button
                        key={d}
                        onClick={() => setDays(d)}
                        style={{
                            padding: "6px 12px",
                            borderRadius: 10,
                            border: "none",
                            background: days === d ? "#444" : "#bbb",
                            color: "#fff",
                        }}
                    >
                        Last {d} days
                    </button>
                ))}
            </div>

            {/* ================= RPE TAB ================= */}
            {tab === "RPE" && hasRPEData && (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={rpeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="RPE" fill="#2196f3" name="Player RPE" />
                        <Bar dataKey="daily_load" fill="#9c27b0" name="Daily Load" />
                        <Bar dataKey="weekly_load" fill="#ff9800" name="Weekly Load" />
                        <Bar dataKey="ACWR" fill="#4caf50" name="ACWR" />
                    </BarChart>
                </ResponsiveContainer>
            )}
            {!hasRPEData && tab === "RPE" && <p>No RPE data available</p>}

            {/* ================= WELLNESS TAB ================= */}
            {tab === "Wellness" && hasWellnessData && (
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={wellnessData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="stress" fill="#f44336" name="Stress" />
                        <Bar dataKey="food_and_drink" fill="#ff9800" name="Food & Drink" />
                        <Bar dataKey="sleep_hours" fill="#4caf50" name="Sleep Hours" />
                        <Bar dataKey="soreness_joint" fill="#2196f3" name="Joint Soreness" />
                        <Bar dataKey="soreness_muscle" fill="#9c27b0" name="Muscle Soreness" />
                    </BarChart>
                </ResponsiveContainer>
            )}
            {!hasWellnessData && tab === "Wellness" && <p>No Wellness data available</p>}

            {/* ================= WORKOUT TAB ================= */}
            {tab === "Workout" && (
                <div style={{ padding: 10 }}>
                    {/* Switch Day */}
                    <div style={{ marginBottom: 15 }}>
                        <button
                            onClick={() => setWorkoutDay(1)}
                            style={{
                                marginRight: 10,
                                padding: "6px 12px",
                                borderRadius: 8,
                                border: "none",
                                background: workoutDay === 1 ? "#1976d2" : "#bbb",
                                color: "#fff",
                            }}
                        >
                            Day 1
                        </button>
                        <button
                            onClick={() => setWorkoutDay(2)}
                            style={{
                                padding: "6px 12px",
                                borderRadius: 8,
                                border: "none",
                                background: workoutDay === 2 ? "#1976d2" : "#bbb",
                                color: "#fff",
                            }}
                        >
                            Day 2
                        </button>
                    </div>

                    {/* Workout Cards */}
                    {workoutData.length > 0 ? (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                            {workoutData.map((row, i) => (
                                <div
                                    key={i}
                                    style={{
                                        flex: "1 1 200px",
                                        padding: 16,
                                        borderRadius: 12,
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                        background: "#fff",
                                    }}
                                >
                                    <h4 style={{ margin: "0 0 8px 0" }}>{row.exercise}</h4>
                                    <p style={{ margin: "0" }}>Reps: {row.reps}</p>
                                    <p style={{ margin: "0" }}>Set: {row.set}</p>
                                    <p style={{ margin: "0" }}>Weight: {row.weight ?? "-"} kg</p>
                                </div>
                            ))}


                        </div>
                    ) : (
                        <p>No workout data available</p>
                    )}
                </div>
            )}

            {/* ================= BOTTOM NAVIGATION ================= */}
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
                }}
            >
                {[FaHome, FaDumbbell, FaSpa, FaClock].map((Icon, i) => (
                    <button
                        key={i}
                        onClick={() => navigate("/")}
                        style={{ background: "none", border: "none", color: "#fff", fontSize: 26 }}
                    >
                        <Icon />
                    </button>
                ))}
            </div>
        </div>
    );
}
