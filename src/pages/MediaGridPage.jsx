import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { imageBaseURL, API_KEY, fetchDataFromAPI } from "../utils/api";
import LoadingOverlay from "../components/LoadingOverlay";
import GridHeader from "../components/GridHeader";
import GridList from "../components/GridList";

// TODO: Create a card for each movie in the list (inside grid-list)
// TODO: Create a grid card for both movies and shows (inside MediaCard)
// TODO: Button must load next set of movies (next page of the list it is loading)

const MediaGridPage = () => {
    // Retrieve parameters
    const location = useLocation();
    const [config, setConfig] = useState(() => {
        // Try from location.state first, fallback to localStorage
        return (
            location.state ||
            JSON.parse(localStorage.getItem("mediaGridConfig"))
        );
    });

    // Variables for media list page.
    let currentPage = 1;
    let totalPages = 0;

    // URL
    let apiUrl = "";

    // Media list
    const [mediaList, setMediaList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (location.state) {
            // If we navigated here with state, update localStorage too
            localStorage.setItem(
                "mediaGridConfig",
                JSON.stringify(location.state)
            );
            setConfig(location.state);
        }
    }, [location.state]);

    if (!config) {
        return <p>No data found for this grid.</p>;
    }

    console.log(config);

    // set typeMedia to work with API call
    let typeMedia = "";
    if (config.mediaType === "movie") {
        typeMedia = "movie";
    } else if (config.mediaType === "show") {
        typeMedia = "tv";
    }

    // Set API URL according to list type
    if (config.listType == "genre") {
        apiUrl = `https://api.themoviedb.org/3/discover/${typeMedia}?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${config.urlParam}`;
    } else if (config.listType == "list") {
        apiUrl = `https://api.themoviedb.org/3${config.urlParam}?api_key=${API_KEY}&page=${currentPage}`;
    }

    // Media grid movies
    useEffect(() => {
        const fetchMediaList = async () => {
            try {
                setLoading(true);
                const res = await fetch(apiUrl);
                const data = await res.json();
                setMediaList(data.results);
            } catch (error) {
                console.log("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        if (apiUrl) {
            fetchMediaList();
        }
    }, [apiUrl]);

    console.log(mediaList);

    return (
        <main>
            {loading && <LoadingOverlay />}

            {!loading && (
                <article page-content="">
                    <section className="media-grid container">
                        {mediaList.length > 0 && (
                            <GridHeader
                                title={config.title}
                                type={config.mediaType}
                            />
                        )}

                        <GridList
                            mediaList={mediaList}
                            type={config.mediaType}
                        />

                        <button className="btn load-more">Load More</button>
                    </section>
                </article>
            )}
        </main>
    );
};

export default MediaGridPage;
