import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaChevronUp } from "react-icons/fa";

export default function Blog() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [adsOpen, setAdsOpen] = useState(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        script.async = true;
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);

        const timeout = setTimeout(() => {
            if (window.adsbygoogle) {
                try {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                } catch (e) {
                    console.error(e);
                }
            }
        }, 500);

        return () => {
            clearTimeout(timeout);
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>

            {/* HEADER */}
            <div
                style={{
                    height: 60,
                    backgroundColor: "#000",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 16px",
                    flexShrink: 0,
                }}
            >
                <FaArrowLeft
                    size={22}
                    style={{ cursor: "pointer", marginRight: 16 }}
                    onClick={() => navigate("/dashboard")}
                />
                <h3 style={{ margin: 0 }}>FitnessApp Blogg</h3>
            </div>

            {/* BLOG */}
            <div style={{ flex: 1, position: "relative" }}>
                {loading && (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#fff",
                            zIndex: 5,
                        }}
                    >
                        <p>Caricamento...</p>
                    </div>
                )}

                <iframe
                    src="https://giuliodambrosio.wixsite.com/fitnessapp/blog"
                    title="FitnessApp Blogg"
                    style={{ width: "100%", height: "100%", border: "none" }}
                    onLoad={() => setLoading(false)}
                />
            </div>

            {/* ADS BOTTOM SHEET */}
            <div
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: adsOpen ? "50vh" : 36,
                    maxHeight: "50vh",
                    backgroundColor: "#f5f5f5",
                    transition: "height 0.25s ease",
                    zIndex: 1000,
                    borderTop: "1px solid #ddd",
                }}
            >
                {/* HANDLE */}
                <div
                    onClick={() => setAdsOpen(!adsOpen)}
                    style={{
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontSize: 12,
                        color: "#444",
                    }}
                >
                    <FaChevronUp
                        style={{
                            transform: adsOpen ? "rotate(180deg)" : "rotate(0)",
                            transition: "transform 0.2s",
                        }}
                    />
                    <span style={{ marginLeft: 6 }}>Annuncio</span>
                </div>

                {/* ADS */}
                {adsOpen && (
                    <div style={{ padding: 8 }}>
                        <ins
                            className="adsbygoogle"
                            style={{ display: "block" }}
                            data-ad-client="ca-pub-6747403673692656"
                            data-ad-slot="1301825297"
                            data-ad-format="auto"
                            data-full-width-responsive="true"
                        ></ins>
                    </div>
                )}
            </div>
        </div>
    );
}
