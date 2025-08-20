import React from "react";
import posterImg from "../assets/images/Blade Runner Poster.png";

const HeroSliderControlItem = ({
    index,
    media,
    imageBaseURL,
    onClick,
    isActive,
    type,
}) => {
    if (type === "movie") {
        return (
            <button
                className={`banner-control-item poster-box ${
                    isActive ? "active" : ""
                }`} // Add active class
                onClick={onClick} // Trigger slide switch
            >
                <img
                    src={`${imageBaseURL}w154${media.poster_path}`}
                    alt={media.title}
                    loading="lazy"
                    draggable="false"
                    className="img-cover"
                />
            </button>
        );
    } else if (type === "show") {
        return (
            <button
                className={`banner-control-item poster-box ${
                    isActive ? "active" : ""
                }`} // Add active class
                onClick={onClick} // Trigger slide switch
            >
                <img
                    src={`${imageBaseURL}w154${media.poster_path}`}
                    alt={media.name}
                    loading="lazy"
                    draggable="false"
                    className="img-cover"
                />
            </button>
        );
    }
};

export default HeroSliderControlItem;
