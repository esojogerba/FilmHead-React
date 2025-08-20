import React from "react";
import { useState, useEffect } from "react";
import HeroSliderControlItem from "./HeroSliderControlItem";

const HeroSliderControl = ({
    mediaList,
    imageBaseURL,
    activeIndex,
    handleControlClick,
    type,
}) => {
    return (
        <div className="banner-control-row">
            <div className="banner-control-inner">
                {mediaList.map((media, i) => (
                    <HeroSliderControlItem
                        key={media.id}
                        index={i}
                        media={media}
                        imageBaseURL={imageBaseURL}
                        isActive={i === activeIndex}
                        type={type}
                        onClick={() => handleControlClick(i)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSliderControl;
