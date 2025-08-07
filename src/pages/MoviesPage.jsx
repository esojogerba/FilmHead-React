import React from "react";
import { useState, useEffect, useRef } from "react";
import { imageBaseURL, API_KEY, fetchDataFromAPI } from "../utils/api";
import bannerImg from "../assets/images/Blade Runner Banner.png";
import posterImg from "../assets/images/Blade Runner Poster.png";
import MovieHeroSlider from "../components/MovieHeroSlider";
import MediaPageHeader from "../components/MediaPageHeader";
import MediaScroll from "../components/MediaScroll";

// TODO: add genre lists

const MoviesPage = () => {
    const [genres, setGenres] = useState({});
    const [heroMovies, setHeroMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [genreMovies, setGenreMovies] = useState([]);

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
                setGenres(genreList);
            } catch (error) {
                console.log("Error fetching data", data);
            }
        };

        fetchGenres();
    }, []);

    // Hero section movies
    useEffect(() => {
        const fetchHeroMovies = async () => {
            const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`;
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                setHeroMovies(data.results);
            } catch (error) {
                console.log("Error fetching data", data);
            }
        };

        fetchHeroMovies();
    }, []);

    // Upcoming movies
    useEffect(() => {
        const fetchUpcomingMovies = async () => {
            const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=1`;
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                setUpcomingMovies(data.results);
            } catch (error) {
                console.log("Error fetching data", data);
            }
        };

        fetchUpcomingMovies();
    }, []);

    // Trending movies
    useEffect(() => {
        const fetchTrendingMovies = async () => {
            const apiUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=1`;
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                setTrendingMovies(data.results);
            } catch (error) {
                console.log("Error fetching data", data);
            }
        };

        fetchTrendingMovies();
    }, []);

    // Top movies
    useEffect(() => {
        const fetchTopMovies = async () => {
            const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1`;
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                setTopMovies(data.results);
            } catch (error) {
                console.log("Error fetching data", data);
            }
        };

        fetchTopMovies();
    }, []);

    // Genre movies
    useEffect(() => {
        const fetchGenreMovies = async () => {
            const results = [];

            // Check that genres is defined and is an object
            if (!genres || typeof genres !== "object") return;

            const genreEntries = Object.entries(genres).filter(
                ([key]) => key !== "asString"
            );

            for (const [genreId, genreName] of genreEntries) {
                const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&page=1&with_origin_country=US&with_genres=${genreId}`;

                try {
                    const res = await fetch(apiUrl);
                    const data = await res.json();

                    results.push({
                        genreId,
                        genreName,
                        movies: data.results || [], // Default to empty array
                    });
                } catch (error) {
                    console.error("Error fetching genre:", genreName, error);
                }
            }

            setGenreMovies(results);
        };

        fetchGenreMovies();
    }, [genres]);

    return (
        <article page-content="">
            <MovieHeroSlider genres={genres} movies={heroMovies} />
            <article className="container">
                <MediaPageHeader title="Movies" genres={genres} />
                <MediaScroll
                    title="Upcoming"
                    media={upcomingMovies}
                    genres={genres}
                />
                <MediaScroll
                    title="Trending This Week"
                    media={trendingMovies}
                    genres={genres}
                />
                <MediaScroll
                    title="Top Rated"
                    media={topMovies}
                    genres={genres}
                />
                {genreMovies.map(({ genreId, genreName, movies }) => (
                    <MediaScroll
                        title={genreName}
                        media={movies}
                        genres={genres}
                    />
                ))}
            </article>
        </article>
    );
};

export default MoviesPage;
