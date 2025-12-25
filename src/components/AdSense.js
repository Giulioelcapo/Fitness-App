import React, { useEffect, useState } from "react";

export default function AdSenseBanner() {
    const [consentGiven, setConsentGiven] = useState(false);

    // Controllo consenso GDPR tramite CMP
    useEffect(() => {
        if (window.__tcfapi) {
            window.__tcfapi("getTCData", 2, (tcData, success) => {
                if (success && tcData?.purpose?.consents) {
                    const consentForAds = tcData.purpose.consents[1]; // purpose 1 = annunci personalizzati
                    setConsentGiven(consentForAds === true);
                }
            });
        }
    }, []);

    // Caricamento script AdSense se consenso dato
    useEffect(() => {
        if (consentGiven) {
            const script = document.createElement("script");
            script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6747403673692656";
            script.async = true;
            script.crossOrigin = "anonymous";
            document.head.appendChild(script);

            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
    }, [consentGiven]);

    if (!consentGiven) {
        return (
            <div style={{ textAlign: "center", padding: 20, border: "1px dashed #ccc", borderRadius: 8 }}>
                Ads will be shown after consent
            </div>
        );
    }

    return (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
            <ins
                className="adsbygoogle"
                style={{ display: "block", width: 300, height: 100, margin: "0 auto" }}
                data-ad-client="ca-pub-6747403673692656"
                data-ad-slot="INSERISCI_IL_TUO_SLOT"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
}
