import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from "recharts";
import { FaHome, FaDumbbell, FaSpa, FaClock } from "react-icons/fa";
import { supabase } from "../supabaseClient";

export default function PlayerDashboard() {
    const { number } = useParams();
    const navigate = useNavigate();

    const [playerName, setPlayerName] = useState(null);
    const [rpeData, setRpeData] = useState([]);
    const [teamAvgRPE, setTeamAvgRPE] = useState([]);
    const [wellnessData, setWellnessData] = useState([]);
    const [teamAvgWellness, setTeamAvgWellness] = useState([]);
    const [tab, setTab] = useState("RPE");
    const [days, setDays] = useState(14);
    const [loading, setLoading] = useState(true);

    /* ==========================
       GET PLAYER NAME
    ========================== */
    useEffect(() => {
        const fetchPlayer = async () => {
            const { data, error } = await supabase
                .from("Players")
                .select("Name")
                .eq("Number", Number(number))
                .single();
            if (!error && data) setPlayerName(data.Name);
        };
        fetchPlayer();
    }, [number]);

    /* ==========================
       FETCH RPE & WELLNESS
    ========================== */
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
                .select(
                    "date, stress, food_and_drink, sleep_hours, soreness_joint, soreness_muscle"
                )
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

    if (loading) return <div style={{ padding: 20 }}>Loading data...</div>;

    const hasRPEData = Array.isArray(rpeData) && rpeData.length > 0;
    const hasWellnessData = Array.isArray(wellnessData) && wellnessData.length > 0;

    return (
        <div style={{ padding: 20, paddingBottom: 120 }}>
            {/* PLAYER NUMBER ONLY */}
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
                <>
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

                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={rpeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="RPE" stroke="#2196f3" strokeWidth={3} name="Player RPE" />
                            <Line type="monotone" dataKey="daily_load" stroke="#9c27b0" strokeWidth={3} name="Player Daily Load" />
                            <Line type="monotone" dataKey="weekly_load" stroke="#ff9800" strokeWidth={3} name="Player Weekly Load" />
                            <Line type="monotone" data={teamAvgRPE} dataKey="RPE" stroke="#555" strokeDasharray="5 5" name="Team RPE Avg" />
                            <Line type="monotone" data={teamAvgRPE} dataKey="daily_load" stroke="#777" strokeDasharray="5 5" name="Team Daily Load Avg" />
                            <Line type="monotone" data={teamAvgRPE} dataKey="weekly_load" stroke="#999" strokeDasharray="5 5" name="Team Weekly Load Avg" />
                            <Line type="monotone" data={teamAvgRPE} dataKey="ACWR" stroke="#4caf50" strokeDasharray="5 5" name="Team ACWR Avg" />
                        </LineChart>
                    </ResponsiveContainer>
                </>
            )}

            {!hasRPEData && tab === "RPE" && <p>No RPE data available</p>}

            {/* ================= WELLNESS TAB ================= */}
            {tab === "Wellness" && hasWellnessData && (
                <>
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

                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={wellnessData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {["stress", "food_and_drink", "sleep_hours", "soreness_joint", "soreness_muscle"].map((key, i) => (
                                <Line key={i} type="monotone" dataKey={key} stroke="#2196f3" strokeWidth={3} name={`Player ${key}`} />
                            ))}
                            {["stress", "food_and_drink", "sleep_hours", "soreness_joint", "soreness_muscle"].map((key, i) => (
                                <Line key={i + 5} type="monotone" data={teamAvgWellness} dataKey={key} stroke="#555" strokeDasharray="5 5" name={`Team ${key} Avg`} />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </>
            )}

            {!hasWellnessData && tab === "Wellness" && <p>No Wellness data available</p>}

            {/* ================= WORKOUT TAB ================= */}
            {tab === "Workout" && (
                <div style={{ padding: 20, borderRadius: 12, background: "#f4f6fa" }}>
                    ✔ Pre-Activation<br />
                    ✔ Strength
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
