import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { imageBaseURL, API_KEY, fetchDataFromAPI } from "../utils/api";
import posterImg from "../assets/images/Blade Runner Poster.png";

import DetailsBanner from "../components/DetailsBanner";
import DetailsTrailers from "../components/DetailsTrailers";
import AvailableOn from "../components/AvailableOn";
import MediaScroll from "../components/MediaScroll";

// TODO: determine media type and use appropriate fetch url
// TODO: inject media data into page
// TODO: split page in to components and pass in movie data if necessary
// TODO: functions for:

const DetailsPage = () => {
    const { type, id } = useParams();
    const [genres, setGenres] = useState({});
    const [media, setMedia] = useState({
        title: "",
        name: "",
        release_date: "",
        backdrop_path: null,
        poster_path: null,
        releases: {
            countries: [{ certification: null }],
        },
        genres: [],
        vote_average: 0,
        casts: { cast: [], crew: [] },
        videos: { results: [] },
    });
    const [availableOn, setAvailableOn] = useState([{ US: null }]);
    const [suggestions, setSuggestions] = useState([]);

    // Fetch genres
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

        const fetchData = async () => {
            let apiUrl = ``;

            if (type === "movie") {
                apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
            } else if (type === "show") {
                apiUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`;
            }

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

            apiUrl = ``;

            if (type === "movie") {
                apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=casts,videos,images,releases`;
            } else if (type === "show") {
                apiUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&append_to_response=credits,videos,images,content_ratings`;
            }

            try {
                const res = await fetch(apiUrl);
                const data = await res.json();

                setMedia(data);
            } catch (error) {
                console.log("Error fetching data", data);
            }

            apiUrl = ``;

            if (type === "movie") {
                apiUrl = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}`;
            } else if (type === "show") {
                apiUrl = `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${API_KEY}`;
            }

            try {
                const res = await fetch(apiUrl);
                const data = await res.json();

                setAvailableOn(data.results);
            } catch (error) {
                console.log("Error fetching data", data);
            }

            apiUrl = ``;

            if (type === "movie") {
                apiUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&page=1`;
            } else if (type === "show") {
                apiUrl = `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}&page=1`;
            }

            try {
                const res = await fetch(apiUrl);
                const data = await res.json();

                setSuggestions(data.results);
            } catch (error) {
                console.log("Error fetching data", data);
            }
        };

        fetchData();
    }, [type, id]);

    return (
        <main>
            {media && (
                <article page-content="">
                    {/* Details Banner */}
                    <DetailsBanner
                        type={type}
                        genres={genres}
                        media={media}
                        imageBaseURL={imageBaseURL}
                    />
                    {/* Trailers & Clips */}
                    <DetailsTrailers media={media} />
                    {/* Available On */}
                    <AvailableOn
                        availableOn={availableOn}
                        imageBaseURL={imageBaseURL}
                    />
                    {/* You May Also Like */}
                    <div className="container">
                        <MediaScroll
                            title="You May Also Like"
                            media={suggestions}
                            genres={genres}
                            type={type}
                        />
                    </div>
                </article>
            )}
        </main>
    );
};

export default DetailsPage;
