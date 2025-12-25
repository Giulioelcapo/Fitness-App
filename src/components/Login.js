import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Lista email autorizzate
const allowedEmails = [
    "giulio_dambrosio@libero.it",
    "player1@example.com",
    "player2@example.com",
];

export default function Login({ setUser }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    // Controlla se l'utente è già loggato
    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser") || sessionStorage.getItem("loggedInUser");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUser(user);
            navigate("/"); // Dashboard è al path "/"
        }
    }, [setUser, navigate]);

    const handleLogin = () => {
        if (!allowedEmails.includes(email)) {
            alert("Email non autorizzata");
            return;
        }
        if (password !== "EskilstunaUnited2026") {
            alert("Password errata");
            return;
        }

        const user = { email };
        if (rememberMe) localStorage.setItem("loggedInUser", JSON.stringify(user));
        else sessionStorage.setItem("loggedInUser", JSON.stringify(user));

        setUser(user);

        // Redirect alla pagina desiderata dopo login
        const nextScreen = location.state?.nextScreen || "/";
        switch (nextScreen) {
            case "RPE":
                navigate("/rpe");
                break;
            case "WellnessForm":
                navigate("/wellness");
                break;
            default:
                navigate("/"); // Dashboard
        }
    };

    const handleBack = () => navigate("/"); // Vai alla Dashboard

    return (
        <div style={{ padding: 20, maxWidth: 400, margin: "0 auto" }}>
            <h2 style={{ marginBottom: 20 }}>Login</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: 10, marginBottom: 15, width: "100%", borderRadius: 6, border: "1px solid #ccc" }}
            />

            <div style={{ position: "relative", marginBottom: 15 }}>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: 10, width: "100%", borderRadius: 6, border: "1px solid #ccc" }}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontWeight: 700, color: "#1976d2" }}
                >
                    {showPassword ? "Hide" : "Show"}
                </button>
            </div>

            <label style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ marginRight: 10 }}
                />
                Stay logged in
            </label>

            <button
                onClick={handleLogin}
                style={{ padding: 14, width: "100%", backgroundColor: "#1976d2", color: "#fff", fontWeight: 700, borderRadius: 6, cursor: "pointer", marginBottom: 10 }}
            >
                Login
            </button>

            <button
                onClick={handleBack}
                style={{ padding: 14, width: "100%", backgroundColor: "#ccc", color: "#000", fontWeight: 700, borderRadius: 6, cursor: "pointer" }}
            >
                Back to Dashboard
            </button>
        </div>
    );
}
