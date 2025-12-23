import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { imageBaseURL, API_KEY, fetchDataFromAPI } from "../utils/api";
import LoadingOverlay from "../components/LoadingOverlay";
import DetailsBanner from "../components/DetailsBanner";
import DetailsTrailers from "../components/DetailsTrailers";
import AvailableOn from "../components/AvailableOn";
import MediaScroll from "../components/MediaScroll";
import AddToFolder from "../components/AddToFolder";
import CreateFolder from "../components/CreateFolder";

const DetailsPage = () => {
    const { type, id } = useParams();
    const [genres, setGenres] = useState({});
    const [media, setMedia] = useState(null);
    const [availableOn, setAvailableOn] = useState({});
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);

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
            setLoading(true);
            try {
                // Build URLs based on type
                const genreUrl =
                    type === "movie"
                        ? `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
                        : `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`;

                const mediaUrl =
                    type === "movie"
                        ? `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=casts,videos,images,releases`
                        : `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&append_to_response=credits,videos,images,content_ratings`;

                const providersUrl =
                    type === "movie"
                        ? `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}`
                        : `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${API_KEY}`;

                const suggestionsUrl =
                    type === "movie"
                        ? `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&page=1`
                        : `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}&page=1`;

                // Fetch in parallel
                const [genresRes, mediaRes, providersRes, suggestionsRes] =
                    await Promise.all([
                        fetch(genreUrl).then((r) => r.json()),
                        fetch(mediaUrl).then((r) => r.json()),
                        fetch(providersUrl).then((r) => r.json()),
                        fetch(suggestionsUrl).then((r) => r.json()),
                    ]);

                // Process genres
                if (genresRes.genres) {
                    for (const { id, name } of genresRes.genres) {
                        genreList[id] = name;
                    }
                    setGenres(genreList);
                }

                // Set states
                setMedia(mediaRes || {});
                setAvailableOn(providersRes.results || {});
                setSuggestions(suggestionsRes.results || []);
            } catch (error) {
                console.error("Error fetching details data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type, id]);

    return (
        <main className="media-page">
            {loading && <LoadingOverlay />}
            <div className="page-motion">
                {media && !loading && (
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

                        {/* Suggestions */}
                        <div className="container">
                            <MediaScroll
                                title="You May Also Like"
                                media={suggestions}
                                genres={genres}
                                type={type}
                                listType="list"
                                urlParam={
                                    type === "movie"
                                        ? `/movie/${id}/recommendations`
                                        : `/tv/${id}/recommendations`
                                }
                            />
                        </div>
                    </article>
                )}
            </div>

            <AddToFolder />
            <CreateFolder />
        </main>
    );
};

export default DetailsPage;
