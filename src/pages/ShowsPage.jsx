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

    return (
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
                />
            </article>
        </article>
    );
};

export default ShowsPage;
