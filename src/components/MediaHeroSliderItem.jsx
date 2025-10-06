import React from "react";
import { Link } from "react-router-dom";
import { usePopup } from "../contexts/PopupContext";

// TODO: Implement details button
// TODO: Implement add button

const MediaHeroSliderItem = ({
    index,
    media,
    imageBaseURL,
    genres,
    isActive,
    type,
}) => {
    const { activePopup, openPopup, closePopup } = usePopup();
    if (type === "movie") {
        return (
            <div
                className={
                    isActive
                        ? "banner-slider-item active"
                        : "banner-slider-item"
                }
            >
                <img
                    src={`${imageBaseURL}w1280${media.backdrop_path}`}
                    alt={media.title}
                    className="img-cover"
                    title={media.title}
                    loading={index === 0 ? "eager" : "lazy"}
                />

                <div className="banner-content">
                    <h2 className="banner-heading">{media.title}</h2>
                    <p className="banner-text">{media.overview}</p>
                    <div className="meta-list">
                        <div className="meta-item">
                            {media.release_date.split("-")[0]}
                        </div>
                    </div>
                    <p className="banner-genre">
                        {genres?.asString?.(media.genre_ids) || ""}
                    </p>
                    <div className="banner-buttons">
                        <Link to={`/details/movie/${media.id}`} className="btn">
                            Details
                        </Link>
                        <a
                            className="btn-icon"
                            onClick={() => openPopup("addToFolder")}
                            id="banner-add-btn"
                        >
                            <svg className="material-icon" id="add-svg">
                                <use
                                    xlinkHref={`${
                                        import.meta.env.BASE_URL
                                    }assets/images/icons.svg#add-icon`}
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        );
    } else if (type === "show") {
        return (
            <div
                className={
                    isActive
                        ? "banner-slider-item active"
                        : "banner-slider-item"
                }
            >
                <img
                    src={`${imageBaseURL}w1280${media.backdrop_path}`}
                    alt={media.name}
                    className="img-cover"
                    title={media.name}
                    loading={index === 0 ? "eager" : "lazy"}
                />

                <div className="banner-content">
                    <h2 className="banner-heading">{media.name}</h2>
                    <p className="banner-text">{media.overview}</p>
                    <div className="meta-list">
                        <div className="meta-item">
                            {media.first_air_date.split("-")[0]}
                        </div>
                    </div>
                    <p className="banner-genre">
                        {genres?.asString?.(media.genre_ids) || ""}
                    </p>
                    <div className="banner-buttons">
                        <Link to={`/details/show/${media.id}`} className="btn">
                            Details
                        </Link>
                        <a
                            className="btn-icon"
                            onClick={() => openPopup("addToFolder")}
                            id="banner-add-btn"
                        >
                            <svg className="material-icon" id="add-svg">
                                <use
                                    xlinkHref={`${
                                        import.meta.env.BASE_URL
                                    }assets/images/icons.svg#add-icon`}
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
};

export default MediaHeroSliderItem;
