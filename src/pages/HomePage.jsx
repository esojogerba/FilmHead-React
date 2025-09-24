import React, { useState, useEffect } from "react";
import CallToAction from "../components/CallToAction";
import Features from "../components/Features";
import LoadingOverlay from "../components/LoadingOverlay";

const HomePage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get all images on the page
        const images = document.querySelectorAll("img");
        let loadedCount = 0;

        if (images.length === 0) {
            setLoading(false);
            return;
        }

        const handleImageLoad = () => {
            loadedCount++;
            if (loadedCount === images.length) {
                setLoading(false);
            }
        };

        images.forEach((img) => {
            if (img.complete) {
                handleImageLoad();
            } else {
                img.addEventListener("load", handleImageLoad);
                img.addEventListener("error", handleImageLoad); // in case an image fails
            }
        });

        return () => {
            images.forEach((img) => {
                img.removeEventListener("load", handleImageLoad);
                img.removeEventListener("error", handleImageLoad);
            });
        };
    }, []);

    if (loading) return <LoadingOverlay />;

    return (
        <main>
            <CallToAction />
            <Features />
            <div className="pop-up-overlay" />
            <div className="pop-up-overlay second-overlay" />
        </main>
    );
};

export default HomePage;
