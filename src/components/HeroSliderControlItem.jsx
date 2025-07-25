import React from "react";
import posterImg from "../assets/images/Blade Runner Poster.png";

const HeroSliderControlItem = ({
    index,
    movie,
    imageBaseURL,
    onClick,
    isActive,
}) => {
    return (
        <button
            className={`banner-control-item poster-box ${
                isActive ? "active" : ""
            }`} // Add active class
            onClick={onClick} // Trigger slide switch
        >
            <img
                src={`${imageBaseURL}w154${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
                draggable="false"
                className="img-cover"
            />
        </button>
    );
};

export default HeroSliderControlItem;
