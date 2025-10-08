import React from "react";
import { Link } from "react-router-dom";
import { imageBaseURL, API_KEY, fetchDataFromAPI } from "../utils/api";
import { usePopup } from "../contexts/PopupContext";

// TODO: implement the add btn

const MediaCard = ({ mediaData, type, genres }) => {
    const { activePopup, openPopup, closePopup } = usePopup();

    if (type === "movie") {
        return (
            <div className="media-card">
                <figure className="poster-box card-poster">
                    <img
                        src={
                            mediaData.poster_path != null
                                ? imageBaseURL + "w342" + mediaData.poster_path
                                : "#"
                        }
                        alt={mediaData.title}
                        className="img-cover"
                        loading="lazy"
                        onError={(e) => (e.target.style.display = "none")}
                    />
                    <a
                        className="media-card-add-btn"
                        onClick={() => openPopup("addToFolder")}
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
                    <img
                        src={
                            mediaData.poster_path != null
                                ? imageBaseURL + "w342" + mediaData.poster_path
                                : "#"
                        }
                        alt={mediaData.name}
                        className="img-cover"
                        loading="lazy"
                        onError={(e) => (e.target.style.display = "none")}
                    />
                    <a
                        className="media-card-add-btn"
                        onClick={() => openPopup("addToFolder")}
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
                    <img
                        src={
                            mediaData.poster_path != null
                                ? imageBaseURL + "w342" + mediaData.poster_path
                                : "#"
                        }
                        alt={mediaData.title}
                        className="img-cover"
                        loading="lazy"
                        onError={(e) => (e.target.style.display = "none")}
                    />
                    <a
                        className="grid-card-add-btn"
                        onClick={() => openPopup("addToFolder")}
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
                    <img
                        src={
                            mediaData.poster_path != null
                                ? imageBaseURL + "w342" + mediaData.poster_path
                                : "#"
                        }
                        alt={mediaData.name}
                        className="img-cover"
                        loading="lazy"
                        onError={(e) => (e.target.style.display = "none")}
                    />
                    <a
                        className="grid-card-add-btn"
                        onClick={() => openPopup("addToFolder")}
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
                    <img
                        src={
                            mediaData.poster_path != null
                                ? imageBaseURL + "w342" + mediaData.poster_path
                                : "#"
                        }
                        alt={mediaData.title}
                        className="img-cover"
                        loading="lazy"
                        onError={(e) => (e.target.style.display = "none")}
                    />
                    <a
                        className="grid-card-trash-btn"
                        onClick={() => openPopup("deleteItem")}
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
                    <img
                        src={
                            mediaData.poster_path != null
                                ? imageBaseURL + "w342" + mediaData.poster_path
                                : "#"
                        }
                        alt={mediaData.name}
                        className="img-cover"
                        loading="lazy"
                        onError={(e) => (e.target.style.display = "none")}
                    />
                    <a
                        className="grid-card-trash-btn"
                        onClick={() => openPopup("deleteItem")}
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
