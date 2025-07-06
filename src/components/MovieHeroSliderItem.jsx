import React from "react";
import bannerImg from "../assets/images/Blade Runner Banner.png";
import posterImg from "../assets/images/Blade Runner Poster.png";

// TODO: Fix onClick for buttons

const MovieHeroSliderItem = ({ index, movie, imageBaseURL, genres }) => {
    return (
        <div
            className={
                index === 0 ? "banner-slider-item active" : "banner-slider-item"
            }
        >
            <img
                src={`${imageBaseURL}w1280${movie.backdrop_path}`}
                alt="{title}"
                className="img-cover"
                title="${title}"
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
                    <a className="btn" href="movie-details.html" onclick="">
                        Details
                    </a>
                    <a
                        className="btn-icon"
                        href=""
                        onclick=""
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
