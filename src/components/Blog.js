import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function Blog() {
    const navigate = useNavigate();

    useEffect(() => {
        // Carica lo script AdSense
        const script = document.createElement("script");
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        script.async = true;
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);

        // Avvia l'annuncio
        (window.adsbygoogle = window.adsbygoogle || []).push({});

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div style={{ height: "100vh", backgroundColor: "#fff", position: "relative" }}>

            {/* =========================
                HEADER BLOG
            ========================= */}
            <div
                style={{
                    height: 60,
                    backgroundColor: "#000",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 16px",
                    zIndex: 1000,
                }}
            >
                <FaArrowLeft
                    size={22}
                    style={{ cursor: "pointer", marginRight: 16 }}
                    onClick={() => navigate("/dashboard")}
                />
                <h3 style={{ margin: 0 }}>FitnessApp Blogg</h3>
            </div>

            {/* =========================
                IFRAME BLOG
            ========================= */}
            <iframe
                src="https://giuliodambrosio.wixsite.com/fitnessapp/blog"
                title="FitnessApp Blogg"
                style={{
                    width: "100%",
                    height: "calc(100vh - 60px - 90px)", // spazio per banner
                    border: "none",
                }}
            />

            {/* =========================
                BANNER AD SENSE
            ========================= */}
            <div
                style={{
                    position: "absolute",
                    bottom: 60, // sopra bottom nav
                    left: 0,
                    width: "100%",
                    textAlign: "center",
                    backgroundColor: "#f9f9f9",
                    padding: "8px 0",
                    zIndex: 1000,
                }}
            >
                <ins className="adsbygoogle"
                    style={{ display: "block" }}
                    data-ad-client="ca-pub-6747403673692656"
                    data-ad-slot="1301825297"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
            </div>
        </div>
    );
}
