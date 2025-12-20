import React from "react";
import Folder from "./Folder";
const BacklogGrid = ({ folders, loading, searchLoading }) => {
    const isLoading = loading || searchLoading;

    return (
        <div className="backlog-grid-wrapper" style={{ position: "relative" }}>
            <div className="backlog-grid">
                {isLoading
                    ? Array.from({ length: 6 }).map((_, index) => (
                          <div
                              key={`folder-skeleton-${index}`}
                              className="folder skeleton-card"
                          >
                              <div className="folder-posters skeleton-poster-row">
                                  {Array.from({ length: 3 }).map((__, i) => (
                                      <div
                                          key={`poster-skeleton-${index}-${i}`}
                                          className="skeleton-poster"
                                      ></div>
                                  ))}
                              </div>
                              <div className="folder-details">
                                  <div className="skeleton-line skeleton-line-lg"></div>
                                  <div className="skeleton-line skeleton-line-sm"></div>
                              </div>
                          </div>
                      ))
                    : folders.length > 0
                      ? folders.map((folder) => (
                            <Folder key={folder.id} folder={folder} />
                        ))
                      : !isLoading && (
                            <p className="empty-message">
                                No folders found.
                            </p>
                        )}
            </div>
        </div>
    );
};

export default BacklogGrid;
