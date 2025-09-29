import React from "react";
import MediaCard from "./MediaCard";

const GridList = ({ mediaList, type }) => {
    const mediaType = "grid-" + type;

    if (mediaList != null) {
        return (
            <>
                <div className="grid-list">
                    {mediaList.map((media, i) => (
                        <MediaCard
                            key={media.id}
                            mediaData={media}
                            type={mediaType}
                        />
                    ))}
                </div>
            </>
        );
    }
};

export default GridList;
