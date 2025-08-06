import React from "react";
import MediaCard from "./MediaCard";

// TODO: implement view more link

const MediaScroll = ({ title, media, genres }) => {
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
                    {media.map((movie, i) => (
                        <MediaCard
                            mediaData={movie}
                            type="movie"
                            genres={genres}
                            key={movie.id}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MediaScroll;
