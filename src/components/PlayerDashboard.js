import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    BarChart, Bar, XAxis, YAxis,
    Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";
import {
    FaHome, FaDumbbell, FaSpa, FaClock,
    FaRunning, FaWalking, FaShoePrints, FaAngleDoubleUp, FaFlag
} from "react-icons/fa";
import { supabase } from "../supabaseClient";
import loggan from "../assets/loggan.png";

export default function PlayerDashboard() {
    const { number } = useParams();
    const navigate = useNavigate();

    const [playerName, setPlayerName] = useState(null);
    const [playerWorkoutTable, setPlayerWorkoutTable] = useState(null);
    const [workoutDay, setWorkoutDay] = useState(1);
    const [workoutData, setWorkoutData] = useState([]);
    const [rpeData, setRpeData] = useState([]);
    const [wellnessData, setWellnessData] = useState([]);
    const [tab, setTab] = useState("RPE");
    const [days, setDays] = useState(14);
    const [loading, setLoading] = useState(true);

    const [testData, setTestData] = useState([]);
    const [selectedTest, setSelectedTest] = useState(null);

    const HEADER_HEIGHT = 130;
    const BOTTOM_HEIGHT = 72;

    /* ========================== FETCH PLAYER ========================== */
    useEffect(() => {
        const fetchPlayer = async () => {
            const { data, error } = await supabase
                .from("Players")
                .select("Name, Workout")
                .eq("Number", Number(number))
                .single();
            if (!error && data) {
                setPlayerName(data.Name);
                setPlayerWorkoutTable(data.Workout);
            } else console.error(error);
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

            const { data: playerRPE } = await supabase
                .from("workloads")
                .select("date, RPE, daily_load, weekly_load, ACWR")
                .eq("name", playerName)
                .gte("date", fromDate.toISOString())
                .order("date", { ascending: true });

            const { data: playerWellness } = await supabase
                .from("MonitoringData")
                .select("date, stress, food_and_drink, sleep_quality, soreness_joint, soreness_muscle")
                .eq("name", playerName)
                .gte("date", fromDate.toISOString())
                .order("date", { ascending: true });

            setRpeData(playerRPE || []);
            setWellnessData(playerWellness || []);
            setLoading(false);
        };
        fetchData();
    }, [playerName, days]);

    /* ========================== FETCH WORKOUT ========================== */
    useEffect(() => {
        if (!playerWorkoutTable) return;
        const fetchWorkout = async () => {
            const { data, error } = await supabase
                .from(playerWorkoutTable)
                .select("exercise, reps, set, weight, codice")
                .eq("day", workoutDay)
                .order("codice", { ascending: true });
            if (!error) setWorkoutData(data || []);
            else console.error(error);
        };
        fetchWorkout();
    }, [playerWorkoutTable, workoutDay]);

    /* ========================== FETCH TEST DATA ========================== */
    useEffect(() => {
        if (!playerName) return;
        const fetchTests = async () => {
            const { data, error } = await supabase
                .from("Test")
                .select("*")
                .eq("Name", playerName)
                .order("date", { ascending: true });
            if (!error) setTestData(data || []);
            else console.error(error);
        };
        fetchTests();
    }, [playerName]);

    if (loading && rpeData.length === 0 && wellnessData.length === 0) {
        return <div style={{ padding: 20 }}>Loading data...</div>;
    }


    /* ========================== FILTER TEST RESULTS ========================== */
    const getTestResults = () => {
        if (!selectedTest || testData.length === 0) return [];
        switch (selectedTest) {
            case "Hamstring":
                return testData.map(t => ({
                    date: t.date,
                    Right: t.hamstringRight,
                    Left: t.hamstringLeft,
                    Asymmetry: t.hamstringAsymmetry
                }));
            case "Sprint10":
                return testData.map(t => ({ date: t.date, value: t.sprint_10m }));
            case "Sprint30":
                return testData.map(t => ({ date: t.date, value: t.sprint_30m }));
            case "SJ":
                return testData.map(t => ({ date: t.date, value: t.SJ }));
            case "CMJ":
                return testData.map(t => ({ date: t.date, value: t.CMJ }));
            case "120m":
                return testData.map(t => ({
                    date: t.date,
                    lap1: t["120lap1"],
                    lap2: t["120lap2"],
                    lap3: t["120lap3"],
                    lap4: t["120lap4"],
                    lap5: t["120lap5"],
                    lap6: t["120lap6"],
                    diff: t["120dif"]
                }));
            default:
                return [];
        }
    };
    const testResults = getTestResults();

    /* ========================== HELPER Y-AXIS MIN VALUE ========================== */
    const getYAxisMin = (data, keys) => {
        if (!data || data.length === 0) return 0;
        let min = Infinity;
        data.forEach(d => {
            keys.forEach(k => {
                if (d[k] !== undefined && d[k] < min) min = d[k];
            });
        });
        return min > 0 ? 0 : min * 0.9; // se min piccolo, scala giusta
    };

    /* ========================== HANDLE BOTTOM NAV ========================== */
    const handleBottomNav = (index) => {
        switch (index) {
            case 0: // Home
                navigate("/");
                break;
            case 1: // RPE
                setTab("RPE");
                break;
            case 2: // Wellness
                setTab("Wellness");
                break;
            case 3: // Workout
                setTab("Workout");
                break;
            default:
                break;
            case 4:
                setTab("Fitness Assessment");
                break;

        }
    };

    return (
        <div style={{ minHeight: "100vh", paddingTop: HEADER_HEIGHT, paddingBottom: BOTTOM_HEIGHT + 20, background: "#f4f6f8" }}>
            {/* HEADER */}
            <header style={{ position: "fixed", top: 0, left: 0, width: "100%", height: HEADER_HEIGHT, backgroundColor: "#000", display: "flex", alignItems: "center", padding: "0 32px", zIndex: 1000 }}>
                <img
                    src={loggan}
                    alt="Logo"
                    style={{ height: 70, width: "auto", cursor: "pointer" }}
                    onClick={() => navigate("/")}
                />
            </header>

            <h2 style={{ marginBottom: 20 }}>#{number} - {playerName}</h2>

            {/* TAB SELECTOR */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                {["RPE", "Wellness", "Workout", "Fitness Assessment"].map(t => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        style={{
                            padding: "8px 16px",
                            borderRadius: 12,
                            border: "none",
                            background: tab === t ? "#00A86B" : "#ddd",
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
                {[7, 14, 28].map(d => (
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

            {/* RPE TAB */}
            {tab === "RPE" && rpeData.length > 0 && (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={rpeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[getYAxisMin(rpeData, ["RPE", "daily_load", "weekly_load", "ACWR"]), 'auto']} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="RPE" fill="#00A86B" name="Player RPE" />
                        <Bar dataKey="daily_load" fill="#9c27b0" name="Daily Load" />
                        <Bar dataKey="weekly_load" fill="#ff9800" name="Weekly Load" />
                        <Bar dataKey="ACWR" fill="#4caf50" name="ACWR" />
                    </BarChart>
                </ResponsiveContainer>
            )}
            {tab === "RPE" && rpeData.length === 0 && <p>No RPE data available</p>}

            {/* WELLNESS TAB */}
            {tab === "Wellness" && wellnessData.length > 0 && (
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={wellnessData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[getYAxisMin(wellnessData, ["stress", "food_and_drink", "sleep_quality", "soreness_joint", "soreness_muscle"]), 'auto']} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="stress" fill="#f44336" name="Stress" />
                        <Bar dataKey="food_and_drink" fill="#ff9800" name="Food & Drink" />
                        <Bar dataKey="sleep_quality" fill="#4caf50" name="Sleep Quality" />
                        <Bar dataKey="soreness_joint" fill="#2196f3" name="Joint Soreness" />
                        <Bar dataKey="soreness_muscle" fill="#9c27b0" name="Muscle Soreness" />
                    </BarChart>
                </ResponsiveContainer>
            )}
            {tab === "Wellness" && wellnessData.length === 0 && <p>No Wellness data available</p>}

            {/* WORKOUT TAB */}
            {tab === "Workout" && (
                <div style={{ padding: 10 }}>
                    <div style={{ marginBottom: 15 }}>
                        {[1, 2].map(d => (
                            <button
                                key={d}
                                onClick={() => setWorkoutDay(d)}
                                style={{
                                    marginRight: 10,
                                    padding: "6px 12px",
                                    borderRadius: 8,
                                    border: "none",
                                    background: workoutDay === d ? "#00A86B" : "#bbb",
                                    color: "#fff",
                                }}
                            >
                                Day {d}
                            </button>
                        ))}
                    </div>

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
                                    <p style={{ margin: 0 }}>Reps: {row.reps}</p>
                                    <p style={{ margin: 0 }}>Set: {row.set}</p>
                                    <p style={{ margin: 0 }}>Weight: {row.weight ?? "-"} kg</p>
                                </div>
                            ))}
                        </div>
                    ) : <p>No workout data available</p>}
                </div>
            )}

            {/* FITNESS ASSESSMENT TAB */}
            {tab === "Fitness Assessment" && (
                <div style={{ padding: 10 }}>
                    <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
                        <button onClick={() => setSelectedTest("Hamstring")} title="Hamstring Test"><FaWalking size={30} /></button>
                        <button onClick={() => setSelectedTest("Sprint10")} title="Sprint 10m"><FaShoePrints size={30} /></button>
                        <button onClick={() => setSelectedTest("Sprint30")} title="Sprint 30m"><FaRunning size={30} /></button>
                        <button onClick={() => setSelectedTest("SJ")} title="Squat Jump"><FaAngleDoubleUp size={30} /></button>
                        <button onClick={() => setSelectedTest("CMJ")} title="CMJ"><FaDumbbell size={30} /></button>
                        <button onClick={() => setSelectedTest("120m")} title="120m Test"><FaFlag size={30} /></button>
                    </div>

                    {testResults.length > 0 ? (
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={testResults}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis domain={[getYAxisMin(testResults, Object.keys(testResults[0] || {}).filter(k => k !== "date")), 'auto']} />
                                <Tooltip />
                                <Legend />
                                {selectedTest === "Hamstring" && (
                                    <>
                                        <Bar dataKey="Right" fill="#00A86B" name="Hamstring Right" />
                                        <Bar dataKey="Left" fill="#ff9800" name="Hamstring Left" />
                                        <Bar dataKey="Asymmetry" fill="#f44336" name="Hamstring Asymmetry" />
                                    </>
                                )}
                                {selectedTest === "Sprint10" && <Bar dataKey="value" fill="#00A86B" name="Sprint 10m" />}
                                {selectedTest === "Sprint30" && <Bar dataKey="value" fill="#00A86B" name="Sprint 30m" />}
                                {selectedTest === "SJ" && <Bar dataKey="value" fill="#00A86B" name="Squat Jump" />}
                                {selectedTest === "CMJ" && <Bar dataKey="value" fill="#00A86B" name="CMJ" />}
                                {selectedTest === "120m" && (
                                    <>
                                        <Bar dataKey="lap1" fill="#00A86B" name="Lap 1" />
                                        <Bar dataKey="lap2" fill="#ff9800" name="Lap 2" />
                                        <Bar dataKey="lap3" fill="#4caf50" name="Lap 3" />
                                        <Bar dataKey="lap4" fill="#2196f3" name="Lap 4" />
                                        <Bar dataKey="lap5" fill="#9c27b0" name="Lap 5" />
                                        <Bar dataKey="lap6" fill="#ff5722" name="Lap 6" />
                                        <Bar dataKey="diff" fill="#795548" name="Diff" />
                                    </>
                                )}
                            </BarChart>
                        </ResponsiveContainer>
                    ) : <p>Select a test to view results</p>}
                </div>
            )}

            {/* BOTTOM NAV */}
            <div style={{ height: BOTTOM_HEIGHT, display: "flex", justifyContent: "space-around", alignItems: "center", backgroundColor: "#010000", position: "fixed", bottom: 0, width: "100%", zIndex: 1000 }}>
                {[FaHome, FaDumbbell, FaSpa, FaClock, FaFlag].map((Icon, i) => (
                    <button key={i} onClick={() => handleBottomNav(i)} style={{ background: "none", border: "none", color: "#fff", fontSize: 26 }}>
                        <Icon />
                    </button>
                ))}
            </div>
        </div>
    );
}
