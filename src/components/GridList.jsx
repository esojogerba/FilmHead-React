import React from "react";
import MediaCard from "./MediaCard";

const GridList = ({ mediaList = [], type, isLoading = false }) => {
    const mediaType = "grid-" + type;

    const shouldShowSkeleton = isLoading && mediaList.length === 0;

    return (
        <div className={`grid-list ${shouldShowSkeleton ? "skeleton-grid" : ""}`}>
            {shouldShowSkeleton
                ? Array.from({ length: 12 }).map((_, index) => (
                      <div
                          key={`grid-skeleton-${index}`}
                          className="grid-card skeleton-card"
                      >
                          <div className="skeleton-poster"></div>
                          <div className="skeleton-line skeleton-line-md"></div>
                          <div className="skeleton-line skeleton-line-sm"></div>
                      </div>
                  ))
                : mediaList.map((media) => (
                      <MediaCard
                          key={media.id}
                          mediaData={media}
                          type={mediaType}
                      />
                  ))}
        </div>
    );
};

export default GridList;
