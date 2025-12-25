import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // react-router
import "./Login.css"; // opzionale, per separare gli stili

const COMMON_PASSWORD = "EskilstunaUnited2026";
const AUTHORIZED_EMAILS = [
    "giulio_dambrosio@libero.it",
    "maria@example.com",
    "luca@example.com",
];

export default function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [stayLoggedIn, setStayLoggedIn] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const nextScreen = location.state?.nextScreen || "/dashboard";

    const handleLogin = () => {
        const cleanEmail = email.toLowerCase().trim();

        if (!email || !password) {
            return alert("Errore: Inserisci email e password");
        }

        if (!AUTHORIZED_EMAILS.includes(cleanEmail)) {
            return alert("Accesso negato: Email non autorizzata");
        }

        if (password !== COMMON_PASSWORD) {
            return alert("Errore: Password errata");
        }

        if (stayLoggedIn) {
            localStorage.setItem("loggedInUser", cleanEmail);
        } else {
            localStorage.removeItem("loggedInUser");
        }

        setUser({ email: cleanEmail });

        // naviga alla schermata successiva
        navigate(nextScreen, { replace: true });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 20 }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 30 }}>Login</h1>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: 12, borderRadius: 6, border: "1px solid #ccc", marginBottom: 15, width: "100%", maxWidth: 400 }}
            />

            <div style={{ display: "flex", alignItems: "center", marginBottom: 15, width: "100%", maxWidth: 400 }}>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ flex: 1, padding: 12, borderRadius: 6, border: "1px solid #ccc" }}
                />
                <button
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ marginLeft: 10, color: "#1976d2", fontWeight: 600, border: "none", background: "transparent", cursor: "pointer" }}
                >
                    {showPassword ? "Hide" : "Show"}
                </button>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, width: "100%", maxWidth: 400 }}>
                <label>
                    <input
                        type="checkbox"
                        checked={stayLoggedIn}
                        onChange={(e) => setStayLoggedIn(e.target.checked)}
                        style={{ marginRight: 8 }}
                    />
                    Rimani connesso
                </label>
            </div>

            <button
                onClick={handleLogin}
                style={{ backgroundColor: "#1976d2", padding: 15, borderRadius: 6, color: "#fff", fontWeight: 600, width: "100%", maxWidth: 400, cursor: "pointer" }}
            >
                LOGIN
            </button>
        </div>
    );
}
