import React, { useEffect, useState } from "react";
import { usePopup } from "../contexts/PopupContext";
import MediaCard from "../components/MediaCard";
import posterImg from "../assets/images/Blade Runner Poster.png";

const FolderGrid = ({ mediaList }) => {
    const { activePopup, openPopup, closePopup } = usePopup();

    if (mediaList != null) {
        return (
            <div className="grid-list folder-grid">
                {mediaList.map((item) => {
                    if (item.media_type != "person") {
                        const mediaType =
                            item.media_type === "tv" ? "show" : item.media_type;

                        return (
                            <MediaCard
                                key={`${item.media_type}-${item.id}`}
                                mediaData={item}
                                type={`folder-${mediaType}`}
                            />
                        );
                    }
                })}
            </div>
        );
    }
};

export default FolderGrid;
