import React from "react";
import { useState, useEffect } from "react";
import { imageBaseURL, API_KEY, fetchDataFromAPI } from "../utils/api";
import HeroSliderControlItem from "./HeroSliderControlItem";
import posterImg from "../assets/images/Blade Runner Poster.png";

const HeroSliderControl = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`;
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                console.log(data);
                setMovies(data.results);
            } catch (error) {
                console.log("Error fetching data", data);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="banner-control-row">
            <div className="banner-control-inner">
                {movies.map((movie, i) => (
                    <HeroSliderControlItem
                        key={movie.id}
                        index={i}
                        movie={movie}
                        imageBaseURL={imageBaseURL}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSliderControl;
