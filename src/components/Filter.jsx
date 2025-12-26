import React, { useState, useEffect } from "react";
import { API_KEY } from "../utils/api";
import { usePopup } from "../contexts/PopupContext";
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
    const isVisible = activePopup === "filter";

    const [openDropdowns, setOpenDropdowns] = useState({
        "movie-genres": false,
        "show-genres": false,
        streaming: false,
    });
    const [searchQueries, setSearchQueries] = useState(
        createInitialSearchQueries()
    );

    // Data fetched from TMDB
    const [movieGenres, setMovieGenres] = useState([]);
    const [tvGenres, setTvGenres] = useState([]);
    const [providers, setProviders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState("");

    // Current selections (persist while user stays on folder page)
    const [selectedMovieGenres, setSelectedMovieGenres] = useState([]);
    const [selectedShowGenres, setSelectedShowGenres] = useState([]);
    const [selectedProviders, setSelectedProviders] = useState([]);
    const [selectedSort, setSelectedSort] = useState("");
    const [hasAppliedFilters, setHasAppliedFilters] = useState(false); // activates clear btn

    // Reset completely when popup closes OR user leaves folder page
    useEffect(() => {
        if (activePopup !== "filter") {
            setSearchQueries(createInitialSearchQueries());
            setOpenDropdowns({
                "movie-genres": false,
                "show-genres": false,
                streaming: false,
            });
            setIsLoading(false);
            setFetchError("");
        }
    }, [activePopup]);

    useEffect(() => {
        if (!isVisible) return undefined;

        const scrollY = window.scrollY;
        const body = document.body;
        const html = document.documentElement;
        const hadBodyNoScroll = body.classList.contains("no-scroll");
        const hadHtmlNoScroll = html.classList.contains("no-scroll");
        const previousStyles = {
            position: body.style.position,
            top: body.style.top,
            left: body.style.left,
            right: body.style.right,
            width: body.style.width,
            overflowY: body.style.overflowY,
        };

        body.classList.add("no-scroll");
        html.classList.add("no-scroll");

        body.style.position = "fixed";
        body.style.top = `-${scrollY}px`;
        body.style.left = "0";
        body.style.right = "0";
        body.style.width = "100%";
        body.style.overflowY = "scroll";

        return () => {
            if (!hadBodyNoScroll) {
                body.classList.remove("no-scroll");
            }
            if (!hadHtmlNoScroll) {
                html.classList.remove("no-scroll");
            }

            body.style.position = previousStyles.position;
            body.style.top = previousStyles.top;
            body.style.left = previousStyles.left;
            body.style.right = previousStyles.right;
            body.style.width = previousStyles.width;
            body.style.overflowY = previousStyles.overflowY;

            window.scrollTo(0, scrollY);
        };
    }, [isVisible]);

    // Reset all selections when the user refreshes or changes pages
    useEffect(() => {
        return () => {
            // Cleanup on page change/unmount
            setSelectedMovieGenres([]);
            setSelectedShowGenres([]);
            setSelectedProviders([]);
            setSelectedSort("");
            setHasAppliedFilters(false);
        };
    }, []);

    // Fetch dropdown data
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

            try {
                const [movieRes, tvRes, providerRes] = await Promise.all([
                    fetch(`${baseUrl}/genre/movie/list?${params}`, {
                        signal: controller.signal,
                    }),
                    fetch(`${baseUrl}/genre/tv/list?${params}`, {
                        signal: controller.signal,
                    }),
                    fetch(
                        `${baseUrl}/watch/providers/movie?${new URLSearchParams(
                            {
                                api_key: API_KEY,
                                language: "en-US",
                                watch_region: "US",
                            }
                        )}`,
                        { signal: controller.signal }
                    ),
                ]);

                if (!movieRes.ok || !tvRes.ok || !providerRes.ok)
                    throw new Error();

                const [movieData, tvData, providerData] = await Promise.all([
                    movieRes.json(),
                    tvRes.json(),
                    providerRes.json(),
                ]);

                setMovieGenres(movieData?.genres ?? []);
                setTvGenres(tvData?.genres ?? []);
                setProviders(providerData?.results ?? []);
            } catch {
                setFetchError("Unable to load filter options.");
                setMovieGenres([]);
                setTvGenres([]);
                setProviders([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDropdownData();
        return () => controller.abort();
    }, [activePopup]);

    if (!isVisible) return null;

    // ---- handlers ----
    const handleSearchChange = (key) => (e) => {
        setSearchQueries((prev) => ({ ...prev, [key]: e.target.value }));
    };

    const handleSearchClear = (key) => () => {
        setSearchQueries((prev) => ({ ...prev, [key]: "" }));
    };

    const toggleDropdown = (name) => {
        setOpenDropdowns((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    const toggleMultiSelect = (value, setter, list) => {
        if (list.includes(value)) setter(list.filter((v) => v !== value));
        else setter([...list, value]);
    };

    const handleSortSelect = (value) => {
        setSelectedSort((prev) => (prev === value ? "" : value));
    };

    const handleDone = () => {
        const payload = {
            movieGenres: selectedMovieGenres,
            showGenres: selectedShowGenres,
            providers: selectedProviders,
            sortBy: selectedSort,
        };

        window.dispatchEvent(
            new CustomEvent("folderFiltersApplied", { detail: payload })
        );
        setHasAppliedFilters(
            selectedMovieGenres.length > 0 ||
                selectedShowGenres.length > 0 ||
                selectedProviders.length > 0 ||
                selectedSort !== ""
        );
        closePopup();
    };

    const handleClear = () => {
        if (!hasAppliedFilters) return;
        setSelectedMovieGenres([]);
        setSelectedShowGenres([]);
        setSelectedProviders([]);
        setSelectedSort("");
        setHasAppliedFilters(false);

        // reset folder view
        window.dispatchEvent(
            new CustomEvent("folderFiltersApplied", {
                detail: {
                    movieGenres: [],
                    showGenres: [],
                    providers: [],
                    sortBy: "",
                },
            })
        );
        closePopup();
    };

    const filteredMovieGenres = filterList(
        movieGenres,
        searchQueries.movieGenres,
        (g) => g.name
    );
    const filteredShowGenres = filterList(
        tvGenres,
        searchQueries.showGenres,
        (g) => g.name
    );
    const filteredProviders = filterList(
        providers,
        searchQueries.streaming,
        (p) => p.provider_name
    );

    return (
        <>
            <div className="pop-up-overlay active" onClick={closePopup}></div>

            <div
                className="filter-pop-up active"
                role="dialog"
                aria-label="Sort and filter"
            >
                <div className="filter-header">
                    <a
                        className="pop-up-close-btn"
                        onClick={closePopup}
                        aria-label="Close"
                    >
                        <svg
                            className="material-icon pop-up-close-icon"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.71 2.88 18.29 9.17 12 2.88 5.71 4.29 4.29 10.59 10.6 16.89 4.29z" />
                        </svg>
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

                <div className="filter-body">
                    {/* SORT BY */}
                    <div className="filter-section-title" id="sort-by">
                        <span>Sort By</span>
                    </div>
                    <div className="sort-by-dropdown">
                        {[
                            ["name-asc", "Name (A to Z)"],
                            ["name-desc", "Name (Z to A)"],
                            ["date-desc", "Date Added (New to Old)"],
                            ["date-asc", "Date Added (Old to New)"],
                        ].map(([val, label]) => (
                            <div
                                key={val}
                                className={`sort-by-scroll-item filter-by-scroll-item ${
                                    selectedSort === val ? "filter-selected" : ""
                                }`}
                                onClick={() => handleSortSelect(val)}
                            >
                                <a
                                    className="add-to-folder-scroll-btn"
                                    href="#"
                                ></a>
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* FILTER BY */}
                    <div className="filter-section-title" id="filter-by">
                        <span>Filter By</span>
                    </div>
                    <div className="filter-by-dropdown">
                        {/* MOVIE GENRES */}
                        <button
                            type="button"
                            className={`filter-subsection-title ${
                                openDropdowns["movie-genres"] ? "is-open" : ""
                            }`}
                            id="movie-genres"
                            onClick={() => toggleDropdown("movie-genres")}
                            aria-expanded={openDropdowns["movie-genres"]}
                            aria-controls="movie-genres-list"
                        >
                            <span>Movie Genres</span>
                            <img src={dropdownArrow} alt="Toggle" />
                        </button>
                        <div
                            className={`movie-genres-scroll ${
                                openDropdowns["movie-genres"] ? "active" : ""
                            }`}
                            id="movie-genres-list"
                        >
                            <div className="filter-dropdown-search-wrapper">
                                <input
                                    type="text"
                                    className="filter-dropdown-search"
                                    aria-label="Search movie genres"
                                    placeholder="Search"
                                    value={searchQueries.movieGenres}
                                    onChange={handleSearchChange("movieGenres")}
                                />
                                {searchQueries.movieGenres && (
                                    <button
                                        type="button"
                                        className="filter-dropdown-search-clear"
                                        onClick={handleSearchClear(
                                            "movieGenres"
                                        )}
                                        aria-label="Clear movie genre search"
                                    >
                                        &times;
                                    </button>
                                )}
                            </div>
                            {isLoading ? (
                                <div className="filter-by-scroll-item">
                                    <span>Loading...</span>
                                </div>
                            ) : fetchError ? (
                                <div className="filter-by-scroll-item">
                                    <span>{fetchError}</span>
                                </div>
                            ) : filteredMovieGenres.length ? (
                                filteredMovieGenres.map((g) => {
                                    const selected = selectedMovieGenres.includes(
                                        g.name
                                    );
                                    return (
                                        <div
                                            key={`movie-${g.id}`}
                                            className={`filter-by-scroll-item ${
                                                selected ? "filter-selected" : ""
                                            }`}
                                            onClick={() =>
                                                toggleMultiSelect(
                                                    g.name,
                                                    setSelectedMovieGenres,
                                                    selectedMovieGenres
                                                )
                                            }
                                        >
                                            <a
                                                className="add-to-folder-scroll-btn"
                                                href="#"
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                            ></a>
                                            <span>{g.name}</span>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="filter-by-scroll-item">
                                    <span>No matching movie genres.</span>
                                </div>
                            )}
                        </div>

                        {/* SHOW GENRES */}
                        <button
                            type="button"
                            className={`filter-subsection-title ${
                                openDropdowns["show-genres"] ? "is-open" : ""
                            }`}
                            id="show-genres"
                            onClick={() => toggleDropdown("show-genres")}
                            aria-expanded={openDropdowns["show-genres"]}
                            aria-controls="show-genres-list"
                        >
                            <span>Show Genres</span>
                            <img src={dropdownArrow} alt="Toggle" />
                        </button>
                        <div
                            className={`show-genres-scroll ${
                                openDropdowns["show-genres"] ? "active" : ""
                            }`}
                            id="show-genres-list"
                        >
                            <div className="filter-dropdown-search-wrapper">
                                <input
                                    type="text"
                                    className="filter-dropdown-search"
                                    aria-label="Search show genres"
                                    placeholder="Search"
                                    value={searchQueries.showGenres}
                                    onChange={handleSearchChange("showGenres")}
                                />
                                {searchQueries.showGenres && (
                                    <button
                                        type="button"
                                        className="filter-dropdown-search-clear"
                                        onClick={handleSearchClear("showGenres")}
                                        aria-label="Clear show genre search"
                                    >
                                        &times;
                                    </button>
                                )}
                            </div>
                            {isLoading ? (
                                <div className="filter-by-scroll-item">
                                    <span>Loading...</span>
                                </div>
                            ) : fetchError ? (
                                <div className="filter-by-scroll-item">
                                    <span>{fetchError}</span>
                                </div>
                            ) : filteredShowGenres.length ? (
                                filteredShowGenres.map((g) => {
                                    const selected = selectedShowGenres.includes(
                                        g.name
                                    );
                                    return (
                                        <div
                                            key={`show-${g.id}`}
                                            className={`filter-by-scroll-item ${
                                                selected ? "filter-selected" : ""
                                            }`}
                                            onClick={() =>
                                                toggleMultiSelect(
                                                    g.name,
                                                    setSelectedShowGenres,
                                                    selectedShowGenres
                                                )
                                            }
                                        >
                                            <a
                                                className="add-to-folder-scroll-btn"
                                                href="#"
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                            ></a>
                                            <span>{g.name}</span>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="filter-by-scroll-item">
                                    <span>No matching show genres.</span>
                                </div>
                            )}
                        </div>

                        {/* STREAMING PLATFORMS */}
                        <button
                            type="button"
                            className={`filter-subsection-title ${
                                openDropdowns.streaming ? "is-open" : ""
                            }`}
                            id="streaming"
                            onClick={() => toggleDropdown("streaming")}
                            aria-expanded={openDropdowns.streaming}
                            aria-controls="streaming-list"
                        >
                            <span>Streaming Platforms</span>
                            <img src={dropdownArrow} alt="Toggle" />
                        </button>
                        <div
                            className={`streaming-scroll ${
                                openDropdowns.streaming ? "active" : ""
                            }`}
                            id="streaming-list"
                        >
                            <div className="filter-dropdown-search-wrapper">
                                <input
                                    type="text"
                                    className="filter-dropdown-search"
                                    aria-label="Search streaming platforms"
                                    placeholder="Search"
                                    value={searchQueries.streaming}
                                    onChange={handleSearchChange("streaming")}
                                />
                                {searchQueries.streaming && (
                                    <button
                                        type="button"
                                        className="filter-dropdown-search-clear"
                                        onClick={handleSearchClear("streaming")}
                                        aria-label="Clear streaming platform search"
                                    >
                                        &times;
                                    </button>
                                )}
                            </div>
                            {isLoading ? (
                                <div className="filter-by-scroll-item">
                                    <span>Loading...</span>
                                </div>
                            ) : fetchError ? (
                                <div className="filter-by-scroll-item">
                                    <span>{fetchError}</span>
                                </div>
                            ) : filteredProviders.length ? (
                                filteredProviders.map((p) => {
                                    const selected = selectedProviders.includes(
                                        p.provider_name
                                    );
                                    return (
                                        <div
                                            key={`provider-${p.provider_id}`}
                                            className={`filter-by-scroll-item ${
                                                selected ? "filter-selected" : ""
                                            }`}
                                            onClick={() =>
                                                toggleMultiSelect(
                                                    p.provider_name,
                                                    setSelectedProviders,
                                                    selectedProviders
                                                )
                                            }
                                        >
                                            <a
                                                className="add-to-folder-scroll-btn"
                                                href="#"
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                            ></a>
                                            <span>{p.provider_name}</span>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="filter-by-scroll-item">
                                    <span>No matching streaming platforms.</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* BUTTONS */}
                <div className="filter-buttons">
                    <a
                        className={`btn btn-secondary ${
                            !hasAppliedFilters ? "disabled" : ""
                        }`}
                        onClick={handleClear}
                    >
                        Clear
                    </a>
                    <a className="btn" onClick={handleDone}>
                        Done
                    </a>
                </div>
            </div>
        </>
    );
};

export default Filter;
