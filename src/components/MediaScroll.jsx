import React, { useRef } from "react";
import MediaCard from "./MediaCard";
import { useNavigate } from "react-router-dom";

// TODO: implement view more link

const MediaScroll = ({ title, media, genres, type, urlParam, listType }) => {
    const navigate = useNavigate();
    const sliderRef = useRef(null);

    // Navigate to MediaGridPage
    const handleViewMore = (e) => {
        e.preventDefault();
        const config = { title, mediaType: type, listType: listType, urlParam };
        const listName = title.toLowerCase().replace(/\s+/g, "");

        // Save to localStorage for refresh persistence
        localStorage.setItem("mediaGridConfig", JSON.stringify(config));

        navigate(`/${type + "s"}/gridlist/${listName}`, { state: config });
    };

    const handleScroll = (direction) => {
        const slider = sliderRef.current;
        if (!slider) return;

        const scrollAmount = Math.round(slider.clientWidth * 0.85);
        slider.scrollBy({
            left: direction * scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <section className="media-scroll">
            <div className="media-scroll-title-wrapper">
                <h3 className="media-scroll-title">{title}</h3>
                <a href="" className="view-more-link" onClick={handleViewMore}>
                    View more
                </a>
            </div>
            <div className="media-scroll-viewport">
                <button
                    className="media-scroll-arrow media-scroll-arrow-left"
                    type="button"
                    aria-label="Scroll left"
                    onClick={() => handleScroll(-1)}
                >
                    <svg
                        className="media-scroll-arrow-icon"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            d="M15 6l-6 6 6 6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <div className="media-slider-list" ref={sliderRef}>
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
                <button
                    className="media-scroll-arrow media-scroll-arrow-right"
                    type="button"
                    aria-label="Scroll right"
                    onClick={() => handleScroll(1)}
                >
                    <svg
                        className="media-scroll-arrow-icon"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            d="M9 6l6 6-6 6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default MediaScroll;
