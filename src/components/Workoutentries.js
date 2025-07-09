
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function Workoutentries() {
    const [players, setPlayers] = useState([]);
    const [playerName, setPlayerName] = useState("");
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkoutRecordId, setSelectedWorkoutRecordId] = useState("");
    const [selectedWorkoutTypeId, setSelectedWorkoutTypeId] = useState("");
    const [exercises, setExercises] = useState([]);
    const [formData, setFormData] = useState({});
    const [showExercises, setShowExercises] = useState(false);
    const [workoutDate, setWorkoutDate] = useState("");

    const thStyle = {
        border: "1px solid #ccc",
        padding: "8px",
        backgroundColor: "#green",
        textAlign: "left"
    };

    const tdStyle = {
        border: "1px solid #ccc",
        padding: "8px"
    };

    const inputStyle = {
        width: "70px"
    };

    useEffect(() => {
        async function fetchPlayers() {
            const { data, error } = await supabase.from("Players").select("Name");
            if (error) console.error("Errore caricamento players:", error);
            else setPlayers(data);
        }
        fetchPlayers();
    }, []);

    useEffect(() => {
        async function fetchWorkouts() {
            const { data, error } = await supabase
                .from("workout")
                .select("id, Name, workout_id");
            if (error) console.error("Errore caricamento workouts:", error);
            else setWorkouts(data);
        }
        fetchWorkouts();
    }, []);

    const fetchExercises = async () => {
        if (!selectedWorkoutTypeId) return;
        const { data, error } = await supabase
            .from("exercise")
            .select("id, Name")
            .eq("workout_id", selectedWorkoutTypeId);
        if (error) console.error("Errore caricamento esercizi:", error);
        else {
            setExercises(data);
            setShowExercises(true);
            const initialForm = {};
            data.forEach((ex) => {
                initialForm[ex.id] = {
                    sets: "",
                    reps: "",
                    weight: "",
                    duration: ""
                };
            });
            setFormData(initialForm);
        }
    };

    const handleInputChange = (exerciseId, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [exerciseId]: {
                ...prev[exerciseId],
                [field]: value
            }
        }));
    };

    const handleSubmit = async () => {
        if (!playerName || !workoutDate || !selectedWorkoutRecordId) {
            alert("Compila tutti i campi (giocatore, data, workout).");
            return;
        }

        const entries = Object.entries(formData).map(([exerciseId, data]) => ({
            player_name: playerName,
            workout_id: selectedWorkoutRecordId,

            exercise_id: exerciseId,
            sets: parseInt(data.sets) || 0,
            reps: parseInt(data.reps) || 0,
            weight: parseFloat(data.weight) || 0,
            duration: data.duration || null,
            date: workoutDate
        }));

        const { error } = await supabase.from("workout_result").insert(entries);
        if (error) {
            console.error("Errore dettagliato:", error.message, error.details);
            alert(`Errore: ${error.message}`);
        } else {
            alert("Workout salvato con successo!");
            setFormData({});
            setShowExercises(false);
            setWorkoutDate("");
        }
    };

    return (
        <div>
            <h2>Workout Entries</h2>

            {/* Select Player */}
            <label>
                Select Player:
                <select
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                >
                    <option value="">-- Select Player --</option>
                    {players.map((p) => (
                        <option key={p.Name} value={p.Name}>{p.Name}</option>
                    ))}
                </select>
            </label>

            <br /><br />

            {/* Select Workout */}
            <label>
                Select Workout:
                <select
                    value={selectedWorkoutRecordId}
                    onChange={(e) => {
                        const selectedId = e.target.value;
                        const workout = workouts.find(w => w.id.toString() === selectedId);
                        setSelectedWorkoutRecordId(selectedId);
                        setSelectedWorkoutTypeId(workout?.workout_id || "");
                        setShowExercises(false);
                    }}
                >
                    <option value="">-- Select Workout --</option>
                    {workouts.map((w) => (
                        <option key={w.id} value={w.id}>{w.Name}</option>
                    ))}
                </select>
            </label>

            <br /><br />

            {/* Select Date */}
            <label>
                Workout Date:
                <input
                    type="date"
                    value={workoutDate}
                    onChange={(e) => setWorkoutDate(e.target.value)}
                />
            </label>

            <br /><br />

            {/* Button to show exercises */}
            {selectedWorkoutTypeId && (
                <button onClick={fetchExercises}>View exercises</button>
            )}

            <br /><br />

            {/* Exercise Table */}
            {showExercises && exercises.length > 0 && (
                <div>
                    <h3>Exercises:</h3>
                    <table style={{ borderCollapse: "collapse", width: "100%" }}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Esercizio</th>
                                <th style={thStyle}>Sets</th>
                                <th style={thStyle}>Reps</th>
                                <th style={thStyle}>Weight (kg)</th>
                                <th style={thStyle}>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exercises.map((ex) => (
                                <tr key={ex.id}>
                                    <td style={tdStyle}>{ex.Name}</td>
                                    <td style={tdStyle}>
                                        <input
                                            type="number"
                                            value={formData[ex.id]?.sets || ""}
                                            onChange={(e) =>
                                                handleInputChange(ex.id, "sets", e.target.value)
                                            }
                                            style={inputStyle}
                                        />
                                    </td>
                                    <td style={tdStyle}>
                                        <input
                                            type="number"
                                            value={formData[ex.id]?.reps || ""}
                                            onChange={(e) =>
                                                handleInputChange(ex.id, "reps", e.target.value)
                                            }
                                            style={inputStyle}
                                        />
                                    </td>
                                    <td style={tdStyle}>
                                        <input
                                            type="number"
                                            value={formData[ex.id]?.weight || ""}
                                            onChange={(e) =>
                                                handleInputChange(ex.id, "weight", e.target.value)
                                            }
                                            style={inputStyle}
                                        />
                                    </td>
                                    <td style={tdStyle}>
                                        <input
                                            type="text"
                                            value={formData[ex.id]?.duration || ""}
                                            onChange={(e) =>
                                                handleInputChange(ex.id, "duration", e.target.value)
                                            }
                                            style={inputStyle}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <br />
                    <button onClick={handleSubmit}>Save Workout</button>
                </div>
            )}
        </div>
    );
}

export default Workoutentries;
