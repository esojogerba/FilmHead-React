import React from "react";
import { useState, useEffect, useRef } from "react";
import { imageBaseURL, API_KEY, fetchDataFromAPI } from "../utils/api";
import LoadingOverlay from "../components/LoadingOverlay";
import MediaHeroSlider from "../components/MediaHeroSlider";
import MediaPageHeader from "../components/MediaPageHeader";
import MediaScroll from "../components/MediaScroll";
import AddToFolder from "../components/AddToFolder";
import CreateFolder from "../components/CreateFolder";

const ShowsPage = () => {
    const [genres, setGenres] = useState({});
    const [heroShows, setHeroShows] = useState([]);
    const [trendingShows, setTrendingShows] = useState([]);
    const [airingToday, setAiringToday] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [genreShows, setGenreShows] = useState([]);
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
                // Fetch all in parallel (Genres, Hero, Trending, Airing Today, Top)
                const [genresRes, heroRes, trendingRes, airingRes, topRes] =
                    await Promise.all([
                        fetch(
                            `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`
                        ).then((r) => r.json()),
                        fetch(
                            `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`
                        ).then((r) => r.json()),
                        fetch(
                            `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&timezone=America/Edmonton&page=1`
                        ).then((r) => r.json()),
                        fetch(
                            `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&timezone=America/Edmonton&page=1`
                        ).then((r) => r.json()),
                        fetch(
                            `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&timezone=America/Edmonton&page=1`
                        ).then((r) => r.json()),
                    ]);

                // Process genres
                for (const { id, name } of genresRes.genres) {
                    genreList[id] = name;
                }
                setGenres(genreList);

                // Set data
                setHeroShows(heroRes.results || []);
                setTrendingShows(trendingRes.results || []);
                setAiringToday(airingRes.results || []);
                setTopRated(topRes.results || []);
            } catch (err) {
                console.error("Error fetching initial data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
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
            {loading && <LoadingOverlay />}
            <div className="page-motion">
                {!loading && (
                    <article page-content="">
                        <MediaHeroSlider
                            genres={genres}
                            mediaList={heroShows}
                            type="show"
                        />

                        <article className="container">
                            <MediaPageHeader
                                title="Shows"
                                genres={genres}
                                type="show"
                            />

                            <MediaScroll
                                key={100}
                                title="Trending This Week"
                                media={trendingShows}
                                genres={genres}
                                type={"show"}
                                urlParam={"/trending/tv/week"}
                                listType={"list"}
                            />

                            <MediaScroll
                                key={200}
                                title="Airing Today"
                                media={airingToday}
                                genres={genres}
                                type={"show"}
                                urlParam={"/tv/airing_today"}
                                listType={"list"}
                            />

                            <MediaScroll
                                key={300}
                                title="Top Rated"
                                media={topRated}
                                genres={genres}
                                type={"show"}
                                urlParam={"/tv/top_rated"}
                                listType={"list"}
                            />

                            {genreShows.map(
                                ({ genreId, genreName, shows }) => (
                                    <MediaScroll
                                        key={genreId}
                                        title={genreName}
                                        media={shows}
                                        genres={genres}
                                        type={"show"}
                                        urlParam={`with_genres=${genreId}`}
                                        listType={"genre"}
                                    />
                                )
                            )}
                        </article>
                    </article>
                )}
            </div>

            <AddToFolder />
            <CreateFolder />
        </main>
    );
};

export default ShowsPage;
