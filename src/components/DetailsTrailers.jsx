import React from "react";
import VideoCard from "./VideoCard";

const DetailsTrailers = ({ media }) => {
    // Filter videos
    const filterVideos = function (videoList = []) {
        if (!Array.isArray(videoList)) return [];

        // Separate trailers and teasers
        const trailers = videoList.filter(
            ({ type, site }) => type === "Trailer" && site === "YouTube"
        );
        const teasers = videoList.filter(
            ({ type, site }) => type === "Teaser" && site === "YouTube"
        );

        // Combine with trailers first, limit to 10
        return [...trailers, ...teasers].slice(0, 10);
    };

    return (
        <section className="media-scroll container">
            <div className="media-scroll-title-wrapper">
                <h3 className="media-scroll-title">Trailers &amp; Clips</h3>
            </div>
            <div className="media-slider-list">
                <div className="slider-list-inner">
                    {filterVideos(media?.videos?.results).map((video, i) => (
                        <VideoCard key={i} video={video} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DetailsTrailers;
