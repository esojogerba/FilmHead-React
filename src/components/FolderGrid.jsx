import React from "react";
import MediaCard from "../components/MediaCard";

const FolderGrid = ({ mediaList }) => {
    if (!mediaList || mediaList.length === 0) return null;

    return (
        <div className="grid-list folder-grid">
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
                />
            ))}
        </div>
    );
};

export default FolderGrid;
