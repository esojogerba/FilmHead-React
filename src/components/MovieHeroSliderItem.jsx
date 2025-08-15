import React from "react";
import { Link } from "react-router-dom";

// TODO: Implement details button
// TODO: Implement add button

const MovieHeroSliderItem = ({
    index,
    movie,
    imageBaseURL,
    genres,
    isActive,
}) => {
    return (
        <div
            className={
                isActive ? "banner-slider-item active" : "banner-slider-item"
            }
        >
            <img
                src={`${imageBaseURL}w1280${movie.backdrop_path}`}
                alt={movie.title}
                className="img-cover"
                title={movie.title}
                loading={index === 0 ? "eager" : "lazy"}
            />

            <div className="banner-content">
                <h2 className="banner-heading">{movie.title}</h2>
                <p className="banner-text">{movie.overview}</p>
                <div className="meta-list">
                    <div className="meta-item">
                        {movie.release_date.split("-")[0]}
                    </div>
                </div>
                <p className="banner-genre">
                    {genres?.asString?.(movie.genre_ids) || ""}
                </p>
                <div className="banner-buttons">
                    <Link
                        to={`/details/movie/${movie.id}`}
                        className="btn"
                        onClick={() => null}
                    >
                        Details
                    </Link>
                    <a
                        className="btn-icon"
                        href=""
                        onClick={() => null}
                        id="banner-add-btn"
                    >
                        <svg className="material-icon" id="add-svg">
                            <use xlinkHref="./assets/images/icons.svg#add-icon" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MovieHeroSliderItem;
