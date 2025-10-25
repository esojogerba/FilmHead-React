import React from "react";
import MediaCard from "../components/MediaCard";
import LoadingOverlay from "../components/LoadingOverlay";

const FolderGrid = ({ mediaList, folderId, loading, searchLoading }) => {
    const isLoading = loading || searchLoading;

    if (!mediaList || mediaList.length === 0) {
        return !isLoading ? <p>No items found.</p> : null;
    }

    return (
        <div
            className={`grid-list folder-grid ${isLoading ? "blurred" : ""}`}
            style={{ position: "relative" }}
        >
            {isLoading && <LoadingOverlay variant="section" />}

            {mediaList.map((item) => (
                <MediaCard
                    key={item.folderItemId}
                    mediaData={{
                        id: item.apiId,
                        title: item.title,
                        name: item.title,
                        poster_path: item.posterPath,
                        release_date: item.year?.toString() || "",
                        first_air_date: item.year?.toString() || "",
                    }}
                    type={`folder-${item.mediaType}`}
                    folderId={folderId}
                />
            ))}
        </div>
    );
};

export default FolderGrid;
