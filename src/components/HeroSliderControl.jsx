import React from "react";
import { useState, useEffect } from "react";
import HeroSliderControlItem from "./HeroSliderControlItem";

const HeroSliderControl = ({
    movies,
    imageBaseURL,
    activeIndex,
    handleControlClick,
}) => {
    return (
        <div className="banner-control-row">
            <div className="banner-control-inner">
                {movies.map((movie, i) => (
                    <HeroSliderControlItem
                        key={movie.id}
                        index={i}
                        movie={movie}
                        imageBaseURL={imageBaseURL}
                        isActive={i === activeIndex}
                        onClick={() => handleControlClick(i)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSliderControl;
