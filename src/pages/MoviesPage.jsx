import React from "react";
import { useState, useEffect, useRef } from "react";
import { imageBaseURL, API_KEY, fetchDataFromAPI } from "../utils/api";
import LoadingOverlay from "../components/LoadingOverlay";
import MediaHeroSlider from "../components/MediaHeroSlider";
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
    const [loading, setLoading] = useState(true);

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

        const fetchInitialData = async () => {
            setLoading(true);
            try {
                // Fetch all in parallel (Genres, Hero, Upcoming, Trending, Top)
                const [genresRes, heroRes, upcomingRes, trendingRes, topRes] =
                    await Promise.all([
                        fetch(
                            `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
                        ).then((r) => r.json()),
                        fetch(
                            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`
                        ).then((r) => r.json()),
                        fetch(
                            `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=1`
                        ).then((r) => r.json()),
                        fetch(
                            `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=1`
                        ).then((r) => r.json()),
                        fetch(
                            `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1`
                        ).then((r) => r.json()),
                    ]);

                // Process genres
                for (const { id, name } of genresRes.genres) {
                    genreList[id] = name;
                }
                setGenres(genreList);

                // Set data
                setHeroMovies(heroRes.results || []);
                setUpcomingMovies(upcomingRes.results || []);
                setTrendingMovies(trendingRes.results || []);
                setTopMovies(topRes.results || []);
            } catch (err) {
                console.error("Error fetching initial data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    // Genre movies
    useEffect(() => {
        const fetchGenreMovies = async () => {
            // Check that genres is defined and is an object
            if (!genres || typeof genres !== "object") return;

            const results = [];

            const genreEntries = Object.entries(genres).filter(
                ([key]) => key !== "asString"
            );

            for (const [genreId, genreName] of genreEntries) {
                try {
                    const res = await fetch(
                        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&page=1&with_origin_country=US&with_genres=${genreId}`
                    );
                    const data = await res.json();

                    results.push({
                        genreId,
                        genreName,
                        movies: data.results || [],
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
        <main className="media-page">
            {loading && <LoadingOverlay />}
            <div className="page-motion">
                {!loading && (
                    <article page-content="">
                        <MediaHeroSlider
                            genres={genres}
                            mediaList={heroMovies}
                            type="movie"
                        />
                        <article className="container">
                            <MediaPageHeader
                                title="Movies"
                                genres={genres}
                                type="movie"
                            />
                            <MediaScroll
                                key={100}
                                title="Upcoming"
                                media={upcomingMovies}
                                genres={genres}
                                type="movie"
                                urlParam={"/movie/upcoming"}
                                listType={"list"}
                            />
                            <MediaScroll
                                key={200}
                                title="Trending This Week"
                                media={trendingMovies}
                                genres={genres}
                                type="movie"
                                urlParam={"/trending/movie/week"}
                                listType={"list"}
                            />
                            <MediaScroll
                                key={300}
                                title="Top Rated"
                                media={topMovies}
                                genres={genres}
                                type="movie"
                                urlParam={"/movie/top_rated"}
                                listType={"list"}
                            />
                            {genreMovies.map(
                                ({ genreId, genreName, movies }) => (
                                    <MediaScroll
                                        key={genreId}
                                        title={genreName}
                                        media={movies}
                                        genres={genres}
                                        type="movie"
                                        urlParam={`with_genres=${genreId}`}
                                        listType="genre"
                                    />
                                )
                            )}
                        </article>
                    </article>
                )}
            </div>
        </main>
    );
};

export default MoviesPage;
