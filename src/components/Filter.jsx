import React, { useState, useEffect } from "react";
import { API_KEY } from "../utils/api";
import { usePopup } from "../contexts/PopupContext";
import closeIcon from "../assets/images/icon-close.svg";
import dropdownArrow from "../assets/images/dropdown-arrow.png";

const createInitialSearchQueries = () => ({
    movieGenres: "",
    showGenres: "",
    streaming: "",
});

const filterList = (items = [], query = "", getLabel = (item) => item) => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return items;
    return items.filter((item) =>
        getLabel(item).toLowerCase().includes(normalizedQuery)
    );
};

const Filter = () => {
    const { activePopup, closePopup } = usePopup();
    const [openDropdowns, setOpenDropdowns] = useState({});
    const [searchQueries, setSearchQueries] = useState(
        createInitialSearchQueries
    );
    const [movieGenres, setMovieGenres] = useState([]);
    const [tvGenres, setTvGenres] = useState([]);
    const [providers, setProviders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState("");

    // Reset when popup closes
    useEffect(() => {
        if (activePopup !== "filter") {
            setOpenDropdowns({});
            setSearchQueries(createInitialSearchQueries());
            setMovieGenres([]);
            setTvGenres([]);
            setProviders([]);
            setIsLoading(false);
            setFetchError("");
        }
    }, [activePopup]);

    // Fetch TMDB data
    useEffect(() => {
        if (activePopup !== "filter") return;

        const controller = new AbortController();
        const fetchDropdownData = async () => {
            setIsLoading(true);
            setFetchError("");

            if (!API_KEY) {
                setFetchError("TMDB API key not configured.");
                setIsLoading(false);
                return;
            }

            const baseUrl = "https://api.themoviedb.org/3";
            const params = new URLSearchParams({
                api_key: API_KEY,
                language: "en-US",
            });

            const requests = [
                fetch(`${baseUrl}/genre/movie/list?${params}`, {
                    signal: controller.signal,
                }),
                fetch(`${baseUrl}/genre/tv/list?${params}`, {
                    signal: controller.signal,
                }),
                fetch(
                    `${baseUrl}/watch/providers/movie?${new URLSearchParams({
                        api_key: API_KEY,
                        language: "en-US",
                        watch_region: "US",
                    })}`,
                    { signal: controller.signal }
                ),
            ];

            try {
                const [movieRes, tvRes, providerRes] = await Promise.all(
                    requests
                );

                if (!movieRes.ok || !tvRes.ok || !providerRes.ok) {
                    throw new Error("Failed to load filter options");
                }

                const [movieData, tvData, providerData] = await Promise.all([
                    movieRes.json(),
                    tvRes.json(),
                    providerRes.json(),
                ]);

                setMovieGenres(movieData?.genres ?? []);
                setTvGenres(tvData?.genres ?? []);
                setProviders(providerData?.results ?? []);
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Failed to load filter data", error);
                    setFetchError("Unable to load filter options.");
                    setMovieGenres([]);
                    setTvGenres([]);
                    setProviders([]);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchDropdownData();
        return () => controller.abort();
    }, [activePopup]);

    if (activePopup !== "filter") return null;

    const toggleDropdown = (name) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    const handleSearchChange = (key) => (event) => {
        const { value } = event.target;
        setSearchQueries((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const filteredMovieGenres = filterList(
        movieGenres,
        searchQueries.movieGenres,
        (genre) => genre.name ?? ""
    );
    const filteredShowGenres = filterList(
        tvGenres,
        searchQueries.showGenres,
        (genre) => genre.name ?? ""
    );
    const filteredStreamingServices = filterList(
        providers,
        searchQueries.streaming,
        (provider) => provider.provider_name ?? ""
    );

    return (
        <>
            <div className="pop-up-overlay active" onClick={closePopup}></div>

            <div className="filter-pop-up active">
                {/* Header */}
                <div className="filter-header">
                    <a className="pop-up-close-btn" onClick={closePopup}>
                        <img
                            id="pop-up-close-img"
                            src={closeIcon}
                            alt="close"
                        />
                    </a>
                    <svg className="material-icon" id="filter-pop-up-svg">
                        <use
                            xlinkHref={`${
                                import.meta.env.BASE_URL
                            }assets/images/icons.svg#filter`}
                        />
                    </svg>
                    <h3 className="header-title">Sort & Filter</h3>
                </div>

                {/* SORT BY */}
                <a
                    onClick={() => toggleDropdown("sort-by")}
                    className="filter-dropdown-btn"
                    id="sort-by"
                >
                    <span>Sort By</span>
                    <img src={dropdownArrow} alt="toggle" />
                </a>
                <div
                    className={`sort-by-dropdown ${
                        openDropdowns["sort-by"] ? "active" : ""
                    }`}
                >
                    <div className="sort-by-scroll-item">
                        <a className="add-to-folder-scroll-btn" href="#"></a>
                        <span>Name (A to Z)</span>
                    </div>
                    <div className="sort-by-scroll-item">
                        <a className="add-to-folder-scroll-btn" href="#"></a>
                        <span>Name (Z to A)</span>
                    </div>
                    <div className="sort-by-scroll-item">
                        <a className="add-to-folder-scroll-btn" href="#"></a>
                        <span>Date Added (New to Old)</span>
                    </div>
                    <div className="sort-by-scroll-item">
                        <a className="add-to-folder-scroll-btn" href="#"></a>
                        <span>Date Added (Old to New)</span>
                    </div>
                </div>

                {/* FILTER BY */}
                <a
                    onClick={() => toggleDropdown("filter-by")}
                    className="filter-dropdown-btn"
                    id="filter-by"
                >
                    <span>Filter By</span>
                    <img src={dropdownArrow} alt="toggle" />
                </a>
                <div
                    className={`filter-by-dropdown ${
                        openDropdowns["filter-by"] ? "active" : ""
                    }`}
                >
                    {/* MOVIE GENRES */}
                    <a
                        onClick={() => toggleDropdown("filter-movie-genres")}
                        className="filter-dropdown-btn"
                        id="filter-movie-genres"
                    >
                        <span>Movie Genres</span>
                        <img src={dropdownArrow} alt="toggle" />
                    </a>
                    <div
                        className={`movie-genres-scroll ${
                            openDropdowns["filter-movie-genres"] ? "active" : ""
                        }`}
                    >
                        <input
                            type="search"
                            className="filter-dropdown-search"
                            aria-label="Search movie genres"
                            placeholder="Search"
                            value={searchQueries.movieGenres}
                            onChange={handleSearchChange("movieGenres")}
                        />
                        {isLoading ? (
                            <div className="filter-by-scroll-item">
                                <span>Loading...</span>
                            </div>
                        ) : fetchError ? (
                            <div className="filter-by-scroll-item">
                                <span>{fetchError}</span>
                            </div>
                        ) : filteredMovieGenres.length ? (
                            filteredMovieGenres.map((genre) => (
                                <div
                                    className="filter-by-scroll-item"
                                    key={genre.id}
                                >
                                    <a
                                        className="add-to-folder-scroll-btn"
                                        href="#"
                                    ></a>
                                    <span>{genre.name}</span>
                                </div>
                            ))
                        ) : (
                            <div className="filter-by-scroll-item">
                                <span>No matching movie genres.</span>
                            </div>
                        )}
                    </div>

                    {/* SHOW GENRES */}
                    <a
                        onClick={() => toggleDropdown("filter-show-genres")}
                        className="filter-dropdown-btn"
                        id="filter-show-genres"
                    >
                        <span>Show Genres</span>
                        <img src={dropdownArrow} alt="toggle" />
                    </a>
                    <div
                        className={`show-genres-scroll ${
                            openDropdowns["filter-show-genres"] ? "active" : ""
                        }`}
                    >
                        <input
                            type="search"
                            className="filter-dropdown-search"
                            aria-label="Search show genres"
                            placeholder="Search"
                            value={searchQueries.showGenres}
                            onChange={handleSearchChange("showGenres")}
                        />
                        {isLoading ? (
                            <div className="filter-by-scroll-item">
                                <span>Loading...</span>
                            </div>
                        ) : fetchError ? (
                            <div className="filter-by-scroll-item">
                                <span>{fetchError}</span>
                            </div>
                        ) : filteredShowGenres.length ? (
                            filteredShowGenres.map((genre) => (
                                <div
                                    className="filter-by-scroll-item"
                                    key={genre.id}
                                >
                                    <a
                                        className="add-to-folder-scroll-btn"
                                        href="#"
                                    ></a>
                                    <span>{genre.name}</span>
                                </div>
                            ))
                        ) : (
                            <div className="filter-by-scroll-item">
                                <span>No matching show genres.</span>
                            </div>
                        )}
                    </div>

                    {/* STREAMING PLATFORMS */}
                    <a
                        onClick={() => toggleDropdown("filter-streaming")}
                        className="filter-dropdown-btn"
                        id="filter-streaming"
                    >
                        <span>Streaming Platforms</span>
                        <img src={dropdownArrow} alt="toggle" />
                    </a>
                    <div
                        className={`streaming-scroll ${
                            openDropdowns["filter-streaming"] ? "active" : ""
                        }`}
                    >
                        <input
                            type="search"
                            className="filter-dropdown-search"
                            aria-label="Search streaming platforms"
                            placeholder="Search"
                            value={searchQueries.streaming}
                            onChange={handleSearchChange("streaming")}
                        />
                        {isLoading ? (
                            <div className="filter-by-scroll-item">
                                <span>Loading...</span>
                            </div>
                        ) : fetchError ? (
                            <div className="filter-by-scroll-item">
                                <span>{fetchError}</span>
                            </div>
                        ) : filteredStreamingServices.length ? (
                            filteredStreamingServices.map((service) => (
                                <div
                                    className="filter-by-scroll-item"
                                    key={service.provider_id}
                                >
                                    <a
                                        className="add-to-folder-scroll-btn"
                                        href="#"
                                    ></a>
                                    <span>{service.provider_name}</span>
                                </div>
                            ))
                        ) : (
                            <div className="filter-by-scroll-item">
                                <span>No matching streaming platforms.</span>
                            </div>
                        )}
                    </div>
                </div>

                <a className="btn" onClick={closePopup}>
                    Done
                </a>
            </div>
        </>
    );
};

export default Filter;
