import React from "react";
import MediaCard from "./MediaCard";

// TODO: implement view more link

const MediaScroll = ({ title, media, genres, type }) => {
    return (
        <section className="media-scroll">
            <div className="media-scroll-title-wrapper">
                <h3 className="media-scroll-title">{title}</h3>
                <a href="" className="view-more-link">
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
