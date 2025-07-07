import React from "react";
import posterImg from "../assets/images/Blade Runner Poster.png";

const HeroSliderControlItem = ({ index, movie, imageBaseURL }) => {
    return (
        <button className="banner-control-item poster-box active">
            <img
                src={`${imageBaseURL}w154${movie.poster_path}`}
                alt="Blade Runner"
                loading="lazy"
                draggable="false"
                className="img-cover"
            />
        </button>
    );
};

export default HeroSliderControlItem;
