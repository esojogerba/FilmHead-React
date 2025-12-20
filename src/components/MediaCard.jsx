import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { imageBaseURL, API_KEY, fetchDataFromAPI } from "../utils/api";
import { usePopup } from "../contexts/PopupContext";

// TODO: implement the add btn

const POSTER_FALLBACK_TIMEOUT_MS = 2000;

const MediaCard = ({ mediaData, type, genres, folderId }) => {
    const { activePopup, openPopup, closePopup } = usePopup();

    const [gridGenres, setGridGenres] = useState({});
    const posterRef = useRef(null);

    useEffect(() => {
        if (type !== "grid-movie" && type !== "grid-show") return;

        const fetchGenres = async () => {
            try {
                const genreUrl =
                    type === "grid-movie"
                        ? `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
                        : `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`;

                const res = await fetch(genreUrl);
                const data = await res.json();

                // Convert array to dictionary + add asString method
                const genreList = {
                    asString(genreIdList) {
                        let newGenreList = [];
                        for (const genreId of genreIdList) {
                            this[genreId] && newGenreList.push(this[genreId]);
                        }
                        return newGenreList.join(" · ");
                    },
                };

                data.genres?.forEach((g) => {
                    genreList[g.id] = g.name;
                });

                setGridGenres(genreList);
            } catch (err) {
                console.error("Failed to load genres for grid card:", err);
            }
        };

        fetchGenres();
    }, [type]);

    // Helper: convert genre IDs to array of names
    const getGenreNames = (genreIds, genresDict) => {
        if (!Array.isArray(genreIds) || !genresDict) return [];
        return genreIds
            .map((id) => genresDict[id]) // lookup name by ID
            .filter(Boolean); // remove undefined values
    };

    const posterSrc = mediaData?.poster_path
        ? imageBaseURL + "w342" + mediaData.poster_path
        : null;
    const posterAlt = mediaData?.title || mediaData?.name || "";
    const [posterLoaded, setPosterLoaded] = useState(!posterSrc);
    const [posterFailed, setPosterFailed] = useState(false);

    useEffect(() => {
        setPosterLoaded(!posterSrc);
        setPosterFailed(false);
    }, [posterSrc]);

    useEffect(() => {
        if (!posterSrc) return undefined;

        const img = posterRef.current;
        if (img && img.complete && img.naturalWidth > 0) {
            setPosterLoaded(true);
            return undefined;
        }

        const timeoutId = window.setTimeout(() => {
            setPosterLoaded(true);
        }, POSTER_FALLBACK_TIMEOUT_MS);

        return () => clearTimeout(timeoutId);
    }, [posterSrc]);

    const handlePosterLoad = () => setPosterLoaded(true);
    const handlePosterError = (event) => {
        setPosterFailed(true);
        setPosterLoaded(true);
        if (event?.target) {
            event.target.style.display = "none";
        }
    };

    const showPosterSkeleton = posterSrc && !posterLoaded && !posterFailed;

    if (type === "movie") {
        return (
            <div className="media-card">
                <figure className="poster-box card-poster">
                    {showPosterSkeleton && (
                        <div className="skeleton-poster skeleton-poster-overlay"></div>
                    )}
                    {posterSrc && (
                        <img
                            src={posterSrc}
                            alt={posterAlt}
                            className="img-cover"
                            loading="lazy"
                            ref={posterRef}
                            onLoad={handlePosterLoad}
                            onError={handlePosterError}
                        />
                    )}
                    <a
                        className="media-card-add-btn"
                        onClick={() =>
                            openPopup("addToFolder", {
                                apiId: mediaData.id,
                                mediaType: "movie",
                                title: mediaData.title,
                                posterPath: mediaData.poster_path,
                                year: mediaData.release_date?.split("-")[0],
                                genres: getGenreNames(
                                    mediaData.genre_ids,
                                    genres
                                ),
                            })
                        }
                    >
                        <svg className="material-icon" id="card-add-svg">
                            <use
                                xlinkHref={`${
                                    import.meta.env.BASE_URL
                                }assets/images/icons.svg#add-icon`}
                            />
                        </svg>
                    </a>
                </figure>
                <h4 className="media-card-title">{mediaData.title}</h4>
                <div className="meta-list media-card-meta">
                    <div className="meta-list">
                        <div className="meta-item">
                            {mediaData.release_date.split("-")[0]}
                        </div>
                    </div>
                </div>
                <p className="media-card-genres">
                    {genres?.asString?.(mediaData.genre_ids) || ""}
                </p>
                <Link
                    to={`/details/movie/${mediaData.id}`}
                    className="card-btn"
                    title=""
                    onClick={() => null}
                ></Link>
            </div>
        );
    } else if (type === "show") {
        return (
            <div className="media-card">
                <figure className="poster-box card-poster">
                    {showPosterSkeleton && (
                        <div className="skeleton-poster skeleton-poster-overlay"></div>
                    )}
                    {posterSrc && (
                        <img
                            src={posterSrc}
                            alt={posterAlt}
                            className="img-cover"
                            loading="lazy"
                            ref={posterRef}
                            onLoad={handlePosterLoad}
                            onError={handlePosterError}
                        />
                    )}
                    <a
                        className="media-card-add-btn"
                        onClick={() =>
                            openPopup("addToFolder", {
                                apiId: mediaData.id,
                                mediaType: "show",
                                title: mediaData.name,
                                posterPath: mediaData.poster_path,
                                year: mediaData.first_air_date?.split("-")[0],
                                genres: getGenreNames(
                                    mediaData.genre_ids,
                                    genres
                                ),
                            })
                        }
                    >
                        <svg className="material-icon" id="card-add-svg">
                            <use
                                xlinkHref={`${
                                    import.meta.env.BASE_URL
                                }assets/images/icons.svg#add-icon`}
                            />
                        </svg>
                    </a>
                </figure>
                <h4 className="media-card-title">{mediaData.name}</h4>
                <div className="meta-list media-card-meta">
                    <div className="meta-list">
                        <div className="meta-item">
                            {mediaData.first_air_date.split("-")[0]}
                        </div>
                    </div>
                </div>
                <p className="media-card-genres">
                    {genres?.asString?.(mediaData.genre_ids) || ""}
                </p>
                <Link
                    to={`/details/show/${mediaData.id}`}
                    className="card-btn"
                    title=""
                    onClick={() => null}
                ></Link>
            </div>
        );
    } else if (type === "grid-movie") {
        return (
            <div className="grid-card">
                <figure className="poster-box grid-card-poster">
                    {showPosterSkeleton && (
                        <div className="skeleton-poster skeleton-poster-overlay"></div>
                    )}
                    {posterSrc && (
                        <img
                            src={posterSrc}
                            alt={posterAlt}
                            className="img-cover"
                            loading="lazy"
                            ref={posterRef}
                            onLoad={handlePosterLoad}
                            onError={handlePosterError}
                        />
                    )}
                    <a
                        className="grid-card-add-btn"
                        onClick={() =>
                            openPopup("addToFolder", {
                                apiId: mediaData.id,
                                mediaType: "movie",
                                title: mediaData.title,
                                posterPath: mediaData.poster_path,
                                year: mediaData.release_date?.split("-")[0],
                                genres: getGenreNames(
                                    mediaData.genre_ids,
                                    gridGenres
                                ),
                            })
                        }
                    >
                        <svg className="material-icon" id="card-add-svg">
                            <use
                                xlinkHref={`${
                                    import.meta.env.BASE_URL
                                }assets/images/icons.svg#add-icon`}
                            />
                        </svg>
                    </a>
                </figure>
                <h4 className="media-card-title">{mediaData.title}</h4>
                <div className="meta-list media-card-meta">
                    <div className="meta-list">
                        <div className="meta-item">
                            {mediaData.release_date.split("-")[0]}
                        </div>
                    </div>
                </div>
                <Link
                    to={`/details/movie/${mediaData.id}`}
                    className="card-btn"
                    title=""
                    onClick={() => null}
                ></Link>
            </div>
        );
    } else if (type === "grid-show") {
        return (
            <div className="grid-card">
                <figure className="poster-box grid-card-poster">
                    {showPosterSkeleton && (
                        <div className="skeleton-poster skeleton-poster-overlay"></div>
                    )}
                    {posterSrc && (
                        <img
                            src={posterSrc}
                            alt={posterAlt}
                            className="img-cover"
                            loading="lazy"
                            ref={posterRef}
                            onLoad={handlePosterLoad}
                            onError={handlePosterError}
                        />
                    )}
                    <a
                        className="grid-card-add-btn"
                        onClick={() =>
                            openPopup("addToFolder", {
                                apiId: mediaData.id,
                                mediaType: "show",
                                title: mediaData.name,
                                posterPath: mediaData.poster_path,
                                year: mediaData.first_air_date?.split("-")[0],
                                genres: getGenreNames(
                                    mediaData.genre_ids,
                                    gridGenres
                                ),
                            })
                        }
                    >
                        <svg className="material-icon" id="card-add-svg">
                            <use
                                xlinkHref={`${
                                    import.meta.env.BASE_URL
                                }assets/images/icons.svg#add-icon`}
                            />
                        </svg>
                    </a>
                </figure>
                <h4 className="media-card-title">{mediaData.name}</h4>
                <div className="meta-list media-card-meta">
                    <div className="meta-list">
                        <div className="meta-item">
                            {mediaData.first_air_date.split("-")[0]}
                        </div>
                    </div>
                </div>
                <Link
                    to={`/details/show/${mediaData.id}`}
                    className="card-btn"
                    title=""
                    onClick={() => null}
                ></Link>
            </div>
        );
    } else if (type === "folder-movie") {
        return (
            <div className="grid-card">
                <figure className="poster-box grid-card-poster">
                    {showPosterSkeleton && (
                        <div className="skeleton-poster skeleton-poster-overlay"></div>
                    )}
                    {posterSrc && (
                        <img
                            src={posterSrc}
                            alt={posterAlt}
                            className="img-cover"
                            loading="lazy"
                            ref={posterRef}
                            onLoad={handlePosterLoad}
                            onError={handlePosterError}
                        />
                    )}
                    <a
                        className="grid-card-trash-btn"
                        onClick={() =>
                            openPopup("deleteItem", {
                                folderId,
                                itemId: mediaData.id,
                            })
                        }
                    >
                        <svg className="material-icon" id="grid-card-trash-svg">
                            <use
                                xlinkHref={`${
                                    import.meta.env.BASE_URL
                                }assets/images/icons.svg#trash`}
                            />
                        </svg>
                    </a>
                </figure>
                <h4 className="media-card-title">{mediaData.title}</h4>
                <div className="meta-list media-card-meta">
                    <div className="meta-list">
                        <div className="meta-item">
                            {mediaData.release_date.split("-")[0]}
                        </div>
                    </div>
                </div>
                <Link
                    to={`/details/movie/${mediaData.id}`}
                    className="card-btn"
                    title=""
                    onClick={() => null}
                ></Link>
            </div>
        );
    } else if (type === "folder-show") {
        return (
            <div className="grid-card">
                <figure className="poster-box grid-card-poster">
                    {showPosterSkeleton && (
                        <div className="skeleton-poster skeleton-poster-overlay"></div>
                    )}
                    {posterSrc && (
                        <img
                            src={posterSrc}
                            alt={posterAlt}
                            className="img-cover"
                            loading="lazy"
                            ref={posterRef}
                            onLoad={handlePosterLoad}
                            onError={handlePosterError}
                        />
                    )}
                    <a
                        className="grid-card-trash-btn"
                        onClick={() =>
                            openPopup("deleteItem", {
                                folderId,
                                itemId: mediaData.id,
                            })
                        }
                    >
                        <svg className="material-icon" id="grid-card-trash-svg">
                            <use
                                xlinkHref={`${
                                    import.meta.env.BASE_URL
                                }assets/images/icons.svg#trash`}
                            />
                        </svg>
                    </a>
                </figure>
                <h4 className="media-card-title">{mediaData.name}</h4>
                <div className="meta-list media-card-meta">
                    <div className="meta-list">
                        <div className="meta-item">
                            {mediaData.first_air_date.split("-")[0]}
                        </div>
                    </div>
                </div>
                <Link
                    to={`/details/show/${mediaData.id}`}
                    className="card-btn"
                    title=""
                    onClick={() => null}
                ></Link>
            </div>
        );
    } else {
        return (
            <div className="media-card">
                <figure className="poster-box card-poster">
                    <img
                        src="#"
                        alt=""
                        className="img-cover"
                        loading="lazy"
                        onError={(e) => (e.target.style.display = "none")}
                    />
                    <a href="" className="media-card-add-btn">
                        <svg className="material-icon" id="card-add-svg">
                            <use
                                xlinkHref={`${
                                    import.meta.env.BASE_URL
                                }assets/images/icons.svg#add-icon`}
                            />
                        </svg>
                    </a>
                </figure>
                <h4 className="media-card-title"></h4>
                <div className="meta-list media-card-meta">
                    <div className="meta-list">
                        <div className="meta-item"></div>
                        <div className="meta-item"></div>
                    </div>
                    <div className="card-badge"></div>
                </div>
                <p className="media-card-genres"></p>
                <a href="" className="card-btn" title="" onClick={() => null} />
            </div>
        );
    }
};

export default MediaCard;
