import React from "react";
import Folder from "./Folder";
import LoadingOverlay from "./LoadingOverlay";

const BacklogGrid = ({ folders, loading, searchLoading }) => {
    const isLoading = loading || searchLoading;

    return (
        <div className="backlog-grid-wrapper" style={{ position: "relative" }}>
            {/* Use section-level overlay when grid is loading */}
            {isLoading && <LoadingOverlay variant="section" />}

            <div className={`backlog-grid ${isLoading ? "blurred" : ""}`}>
                {folders.length > 0
                    ? folders.map((folder) => (
                          <Folder key={folder.id} folder={folder} />
                      ))
                    : !isLoading && (
                          <p className="empty-message">No folders found.</p>
                      )}
            </div>
        </div>
    );
};

export default BacklogGrid;
