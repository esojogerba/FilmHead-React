import React from "react";
import { Link } from "react-router-dom";
import { usePopup } from "../contexts/PopupContext";

const MediaHeroSliderItem = ({
    index,
    media,
    imageBaseURL,
    genres, // object like {12: "Adventure", 14: "Fantasy"}
    isActive,
    type,
}) => {
    const { openPopup } = usePopup();

    // Helper: convert genre IDs to array of names
    const getGenreNames = (genreIds, genresDict) => {
        if (!Array.isArray(genreIds) || !genresDict) return [];
        return genreIds
            .map((id) => genresDict[id]) // lookup name
            .filter(Boolean); // remove undefined
    };

    const handleAddToFolder = () => {
        const genreNames = getGenreNames(media.genre_ids, genres);

        openPopup("addToFolder", {
            apiId: media.id,
            mediaType: type,
            title: media.title || media.name,
            posterPath: media.poster_path,
            year:
                type === "movie"
                    ? media.release_date?.split("-")[0]
                    : media.first_air_date?.split("-")[0],
            genres: genreNames,
        });
    };

    return (
        <div
            className={
                isActive ? "banner-slider-item active" : "banner-slider-item"
            }
        >
            <img
                src={`${imageBaseURL}w1280${media.backdrop_path}`}
                alt={media.title || media.name}
                className="img-cover"
                title={media.title || media.name}
                loading={index === 0 ? "eager" : "lazy"}
            />

            <div className="banner-content">
                <h2 className="banner-heading">{media.title || media.name}</h2>
                <p className="banner-text">{media.overview}</p>

                <div className="meta-list">
                    <div className="meta-item">
                        {type === "movie"
                            ? media.release_date.split("-")[0]
                            : media.first_air_date.split("-")[0]}
                    </div>
                </div>

                <p className="banner-genre">
                    {genres?.asString?.(media.genre_ids) || ""}
                </p>

                <div className="banner-buttons">
                    <Link to={`/details/${type}/${media.id}`} className="btn">
                        Details
                    </Link>
                    <a
                        className="btn-icon"
                        onClick={handleAddToFolder}
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
};

export default MediaHeroSliderItem;
