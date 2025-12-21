import React from "react";
import Folder from "./Folder";

const ICON_SPRITE_PATH = `${import.meta.env.BASE_URL}assets/images/icons.svg`;

const BacklogGrid = ({ folders, loading, searchLoading, searchTerm }) => {
    const isLoading = loading || searchLoading;
    const hasSearchTerm = searchTerm?.trim().length > 0;

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
                            <div className="empty-state">
                                <svg
                                    className="empty-state__icon"
                                    aria-hidden="true"
                                >
                                    <use
                                        xlinkHref={`${ICON_SPRITE_PATH}#folder`}
                                    />
                                </svg>
                                <p className="empty-state__text">
                                    {hasSearchTerm
                                        ? "No folders found."
                                        : "No folders yet."}
                                </p>
                            </div>
                        )}
            </div>
        </div>
    );
};

export default BacklogGrid;
