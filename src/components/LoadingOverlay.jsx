import React from "react";

/**
 * Reusable loading overlay that can cover the full page or a specific section.
 * @param {"page"|"section"} variant - where to show the overlay
 */
const LoadingOverlay = ({ variant = "page", role }) => {
    return (
        <div
            className={`loading-overlay ${
                variant === "section" ? "section-overlay" : ""
            }`}
            data-role={role}
        >
            <div className="loading-spinner"></div>
        </div>
    );
};

export default LoadingOverlay;
