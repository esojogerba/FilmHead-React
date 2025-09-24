import React from "react";
import MediaCard from "./MediaCard";
import { useNavigate } from "react-router-dom";

// TODO: implement view more link

const MediaScroll = ({ title, media, genres, type, urlParam, listType }) => {
    const navigate = useNavigate();

    // Navigate to MediaGridPage
    const handleViewMore = (e) => {
        e.preventDefault();
        const config = { title, mediaType: type, listType: listType, urlParam };
        const listName = title.toLowerCase().replace(/\s+/g, "");

        // Save to localStorage for refresh persistence
        localStorage.setItem("mediaGridConfig", JSON.stringify(config));

        navigate(`/${type + "s"}/gridlist/${listName}`, { state: config });
    };

    return (
        <section className="media-scroll">
            <div className="media-scroll-title-wrapper">
                <h3 className="media-scroll-title">{title}</h3>
                <a href="" className="view-more-link" onClick={handleViewMore}>
                    View More
                </a>
            </div>
            <div className="media-slider-list">
                <div className="slider-list-inner">
                    {media.map((item, i) => (
                        <MediaCard
                            mediaData={item}
                            type={type}
                            genres={genres}
                            key={item.id}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MediaScroll;
