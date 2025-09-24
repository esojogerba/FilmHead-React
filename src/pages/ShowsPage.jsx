import React from "react";
import { useState, useEffect, useRef } from "react";
import { imageBaseURL, API_KEY, fetchDataFromAPI } from "../utils/api";
import MediaHeroSlider from "../components/MediaHeroSlider";
import MediaPageHeader from "../components/MediaPageHeader";
import MediaScroll from "../components/MediaScroll";

const ShowsPage = () => {
    const [genres, setGenres] = useState({});
    const [heroShows, setHeroShows] = useState([]);
    const [trendingShows, setTrendingShows] = useState([]);
    const [airingToday, setAiringToday] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [genreShows, setGenreShows] = useState([]);

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
            const apiUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`;
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

    // Hero section shows
    useEffect(() => {
        const fetchHeroShows = async () => {
            const apiUrl = `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`;
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                setHeroShows(data.results);
            } catch (error) {
                console.log("Error fetching data", data);
            }
        };

        fetchHeroShows();
    }, []);

    // Trending shows
    useEffect(() => {
        const fetchTrendingShows = async () => {
            const apiUrl = `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&timezone=America/Edmonton&page=1`;
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                setTrendingShows(data.results);
            } catch (error) {
                console.log("Error fetching data", data);
            }
        };

        fetchTrendingShows();
    }, []);

    // Airing today
    useEffect(() => {
        const fetchAiringToday = async () => {
            const apiUrl = `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&timezone=America/Edmonton&page=1`;
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                setAiringToday(data.results);
            } catch (error) {
                console.log("Error fetching data", data);
            }
        };

        fetchAiringToday();
    }, []);

    // Top rated
    useEffect(() => {
        const fetchTopRated = async () => {
            const apiUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&timezone=America/Edmonton&page=1`;
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                setTopRated(data.results);
            } catch (error) {
                console.log("Error fetching data", data);
            }
        };

        fetchTopRated();
    }, []);

    // Genre shows
    useEffect(() => {
        const fetchGenreShows = async () => {
            const results = [];

            // Check that genres is defined and is an object
            if (!genres || typeof genres !== "object") return;

            const genreEntries = Object.entries(genres).filter(
                ([key]) => key !== "asString"
            );

            for (const [genreId, genreName] of genreEntries) {
                const apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&page=1&with_origin_country=US&with_genres=${genreId}`;

                try {
                    const res = await fetch(apiUrl);
                    const data = await res.json();

                    results.push({
                        genreId,
                        genreName,
                        shows: data.results || [], // Default to empty array
                    });
                } catch (error) {
                    console.error("Error fetching genre:", genreName, error);
                }
            }

            setGenreShows(results);
        };

        fetchGenreShows();
    }, [genres]);

    return (
        <main>
            <article page-content="">
                <MediaHeroSlider
                    genres={genres}
                    mediaList={heroShows}
                    type="show"
                />

                <article className="container">
                    <MediaPageHeader title="Shows" genres={genres} />

                    <MediaScroll
                        key={100}
                        title="Trending This Week"
                        media={trendingShows}
                        genres={genres}
                        type={"show"}
                        urlParam={"/trending/tv/week"}
                    />

                    <MediaScroll
                        key={200}
                        title="Airing Today"
                        media={airingToday}
                        genres={genres}
                        type={"show"}
                        urlParam={"/tv/airing_today"}
                    />

                    <MediaScroll
                        key={300}
                        title="Top Rated"
                        media={topRated}
                        genres={genres}
                        type={"show"}
                        urlParam={"/tv/top_rated"}
                    />

                    {genreShows.map(({ genreId, genreName, shows }) => (
                        <MediaScroll
                            key={genreId}
                            title={genreName}
                            media={shows}
                            genres={genres}
                            type={"show"}
                            urlParam={`with_genres=${genreId}`}
                        />
                    ))}
                </article>
            </article>
        </main>
    );
};

export default ShowsPage;
