import React from "react";

/**
 * Reusable loading overlay that can cover the full page or a specific section.
 * @param {"page"|"section"} variant - where to show the overlay
 */
const LoadingOverlay = ({ variant = "page" }) => {
    return (
        <div
            className={`loading-overlay ${
                variant === "section" ? "section-overlay" : ""
            }`}
        >
            <div className="loading-spinner"></div>
        </div>
    );
};

export default LoadingOverlay;
