import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_KEY } from "../utils/api";
import GridHeader from "../components/GridHeader";
import GridList from "../components/GridList";
import AddToFolder from "../components/AddToFolder";
import CreateFolder from "../components/CreateFolder";

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

    // Media list
    const [mediaList, setMediaList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    useEffect(() => {
        if (location.state) {
            // If we navigated here with state, update localStorage too
            localStorage.setItem(
                "mediaGridConfig",
                JSON.stringify(location.state)
            );
            setConfig(location.state);
            setCurrentPage(1);
            setMediaList([]);
            setTotalPages(null);
        }
    }, [location.state]);

    if (!config) {
        return <p>No data found for this grid.</p>;
    }

    const buildApiUrl = (pageNumber) => {
        const discoverType = config.mediaType === "movie" ? "movie" : "tv";

        if (config.listType === "genre") {
            return `https://api.themoviedb.org/3/discover/${discoverType}?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&page=${pageNumber}&${config.urlParam}`;
        }

        return `https://api.themoviedb.org/3${config.urlParam}?api_key=${API_KEY}&page=${pageNumber}`;
    };

    useEffect(() => {
        if (!config) {
            return undefined;
        }

        let isCancelled = false;
        const controller = new AbortController();

        const fetchMediaList = async () => {
            try {
                if (currentPage === 1) {
                    setLoading(true);
                } else {
                    setIsLoadingMore(true);
                }

                const response = await fetch(buildApiUrl(currentPage), {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch media list: ${response.status}`
                    );
                }

                const data = await response.json();

                if (isCancelled) {
                    return;
                }

                setTotalPages(data.total_pages || 0);
                setMediaList((prevMedia) => {
                    const newResults = data.results || [];
                    if (currentPage === 1) {
                        return newResults;
                    }

                    return [...prevMedia, ...newResults];
                });
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Error fetching data", error);
                }
            } finally {
                if (isCancelled) {
                    return;
                }

                if (currentPage === 1) {
                    setLoading(false);
                } else {
                    setIsLoadingMore(false);
                }
            }
        };

        fetchMediaList();

        return () => {
            isCancelled = true;
            controller.abort();
        };
    }, [config, currentPage]);

    const handleLoadMore = () => {
        if (isLoadingMore) {
            return;
        }

        if (totalPages !== null && currentPage >= totalPages) {
            return;
        }

        setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
        <main>
            <div className="page-motion">
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
                            isLoading={loading}
                        />
                        {mediaList.length > 0 &&
                            totalPages !== null &&
                            currentPage < totalPages && (
                                <button
                                    className="btn load-more"
                                    onClick={handleLoadMore}
                                    disabled={isLoadingMore}
                                >
                                    {isLoadingMore ? "Loading..." : "Load More"}
                                </button>
                            )}
                    </section>
                </article>
            </div>

            <AddToFolder />
            <CreateFolder />
        </main>
    );
};

export default MediaGridPage;
