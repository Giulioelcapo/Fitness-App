import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
        if (window.gtag) {
            window.gtag("config", "G-XXXXXXXXXX", {
                page_path: location.pathname,
            });
        }
    }, [location]);

    return null;
};

export default AnalyticsTracker;
