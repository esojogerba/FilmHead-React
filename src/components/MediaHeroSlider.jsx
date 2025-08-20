import React from "react";
import { useState, useEffect, useRef } from "react";
import { imageBaseURL, API_KEY, fetchDataFromAPI } from "../utils/api";
import MediaHeroSliderItem from "./MediaHeroSliderItem";
import HeroSliderControl from "./HeroSliderControl";

// TODO: API integration
// TODO: slider timer
// TODO: Routing to details page
// TODO: add to folder pop up integration

const MediaHeroSlider = ({ genres, mediaList, type }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef(null);

    const startAutoSlide = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % mediaList.length);
        }, 10000);
    };

    useEffect(() => {
        if (mediaList.length > 0) {
            startAutoSlide();
        }

        return () => clearInterval(intervalRef.current);
    }, [mediaList]);

    const handleControlClick = (index) => {
        setActiveIndex(index);
        startAutoSlide();
    };

    return (
        <section className="banner">
            <div className="banner-slider-row">
                {mediaList.map((media, i) => (
                    <MediaHeroSliderItem
                        key={media.id}
                        index={i}
                        media={media}
                        imageBaseURL={imageBaseURL}
                        genres={genres}
                        isActive={i === activeIndex}
                        type={type}
                    />
                ))}
            </div>
            <HeroSliderControl
                mediaList={mediaList}
                imageBaseURL={imageBaseURL}
                activeIndex={activeIndex}
                type={type}
                handleControlClick={handleControlClick}
            />
        </section>
    );
};

export default MediaHeroSlider;
