import React from "react";
import { useState, useEffect, useRef } from "react";
import { imageBaseURL, API_KEY, fetchDataFromAPI } from "../utils/api";
import MovieHeroSliderItem from "./MovieHeroSliderItem";
import HeroSliderControl from "./HeroSliderControl";

// TODO: API integration
// TODO: slider timer
// TODO: Routing to details page
// TODO: add to folder pop up integration

const MovieHeroSlider = () => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState({});

    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef(null);

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

    useEffect(() => {
        // Fetch all genres. Example: [ { "id": "123", "name": "Action" } ]
        // Then change genre format to {123: "Action"}
        const genreList = {
            // Assign correct genre string to each genre_id provided. Example: [23 , 43] = "Action, Romance".
            asString(genreIdList) {
                // Will hold list of genre strings.
                let newGenreList = [];

                for (const genreId of genreIdList) {
                    // If current genreId exists in genreList, push it to newGenreList.
                    // this == genreList
                    this[genreId] && newGenreList.push(this[genreId]);
                }
                return newGenreList.join(" · ");
            },
        };

        const fetchGenres = async () => {
            const apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();

                for (const { id, name } of data.genres) {
                    genreList[id] = name;
                }
                console.log(genreList);
                setGenres(genreList);
            } catch (error) {
                console.log("Error fetching data", data);
            }
        };

        fetchGenres();
    }, []);

    const startAutoSlide = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % movies.length);
        }, 10000);
    };

    useEffect(() => {
        if (movies.length > 0) {
            startAutoSlide();
        }

        return () => clearInterval(intervalRef.current);
    }, [movies]);

    const handleControlClick = (index) => {
        setActiveIndex(index);
        startAutoSlide();
    };

    return (
        <section className="banner">
            <div className="banner-slider-row">
                {movies.map((movie, i) => (
                    <MovieHeroSliderItem
                        key={movie.id}
                        index={i}
                        movie={movie}
                        imageBaseURL={imageBaseURL}
                        genres={genres}
                        isActive={i === activeIndex}
                    />
                ))}
            </div>
            <HeroSliderControl
                movies={movies}
                imageBaseURL={imageBaseURL}
                activeIndex={activeIndex}
                handleControlClick={handleControlClick}
            />
        </section>
    );
};

export default MovieHeroSlider;
