import React from "react";
import { usePopup } from "../contexts/PopupContext";
import starIcon from "../assets/images/star-icon.svg";

const DetailsBanner = ({ type, genres, media, imageBaseURL }) => {
    const { openPopup } = usePopup();

    const calcRuntimeHours = (runtime) => {
        const hours = Math.floor(parseInt(runtime) / 60);
        return hours === 0 ? "" : `${hours}h`;
    };

    const calcRuntimeMinutes = (runtime) => {
        const minutes = parseInt(runtime) % 60;
        return ` ${minutes}m`;
    };

    const getGenres = (genreList) => genreList.map((g) => g.name).join(" · ");

    const getCasts = (castList) =>
        castList
            .slice(0, 10)
            .map((c) => c.name)
            .join(", ");

    const getDirectors = (crewList) =>
        crewList
            .filter(({ job }) => job === "Director")
            .map((d) => d.name)
            .join(", ");

    const getCreators = (creators) =>
        creators
            .slice(0, 10)
            .map((c) => c.name)
            .join(", ");

    const handleAddToFolder = () => {
        openPopup("addToFolder", {
            apiId: media.id,
            mediaType: type,
            title: media.title || media.name,
            posterPath: media.poster_path,
            year:
                type === "movie"
                    ? media.release_date?.split("-")[0]
                    : media.first_air_date?.split("-")[0],
            genres: media.genres?.map((g) => g.name) || [],
        });
    };

    if (type === "movie") {
        return (
            <section className="banner details-banner">
                <div
                    className="backdrop-image"
                    style={{
                        backgroundImage: `linear-gradient(var(--details-overlay)), url(${
                            media.backdrop_path
                                ? imageBaseURL + "w1280" + media.backdrop_path
                                : "#"
                        })`,
                    }}
                ></div>

                <div className="banner-columns">
                    <div className="banner-left-column">
                        <figure className="poster-box details-poster">
                            <img
                                src={
                                    media.poster_path
                                        ? imageBaseURL +
                                          "w342" +
                                          media.poster_path
                                        : "#"
                                }
                                alt={media.title}
                                className="img-cover"
                            />
                        </figure>

                        <a
                            className="btn btn-text-icon"
                            onClick={handleAddToFolder}
                        >
                            <span>Add to Folder</span>
                            <svg className="material-icon" id="details-add-svg">
                                <use
                                    xlinkHref={`${
                                        import.meta.env.BASE_URL
                                    }assets/images/icons.svg#add-icon`}
                                />
                            </svg>
                        </a>
                    </div>

                    <div className="banner-right-column">
                        <h2 className="banner-heading details-heading">
                            {media.title}
                        </h2>
                        <div className="details-meta">
                            <div className="meta-list">
                                <div className="meta-item">
                                    {media.release_date.split("-")[0]}
                                </div>
                                <div className="meta-item">
                                    {calcRuntimeHours(media.runtime)}
                                    {calcRuntimeMinutes(media.runtime)}
                                </div>
                                <div className="meta-item card-badge">
                                    {media?.releases?.countries?.find(
                                        (c) => c.iso_3166_1 === "US"
                                    )?.certification || ""}
                                </div>
                                <div className="meta-item">
                                    <img
                                        src={starIcon}
                                        width={20}
                                        height={20}
                                        alt="Rating"
                                    />
                                    <span>{media.vote_average.toFixed(1)}</span>
                                </div>
                            </div>
                            <p className="details-genre">
                                {getGenres(media.genres)}
                            </p>
                        </div>
                        <p className="details-text">{media.overview}</p>
                        <div className="details-cast">
                            <p className="cast-title">Starring</p>
                            <p className="cast-body">
                                {getCasts(media?.casts?.cast || [])}
                            </p>
                        </div>
                        <div className="details-director">
                            <p className="director-title">Directed By</p>
                            <p className="director-body">
                                {getDirectors(media?.casts?.crew || [])}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    } else if (type === "show") {
        return (
            <section className="banner details-banner">
                <div
                    className="backdrop-image"
                    style={{
                        backgroundImage: `linear-gradient(var(--details-overlay)), url(${
                            media.backdrop_path
                                ? imageBaseURL + "w1280" + media.backdrop_path
                                : "#"
                        })`,
                    }}
                ></div>

                <div className="banner-columns">
                    <div className="banner-left-column">
                        <figure className="poster-box details-poster">
                            <img
                                src={
                                    media.poster_path
                                        ? imageBaseURL +
                                          "w342" +
                                          media.poster_path
                                        : "#"
                                }
                                alt={media.name}
                                className="img-cover"
                            />
                        </figure>

                        <a
                            className="btn btn-text-icon"
                            onClick={handleAddToFolder}
                        >
                            <span>Add to Folder</span>
                            <svg className="material-icon" id="details-add-svg">
                                <use
                                    xlinkHref={`${
                                        import.meta.env.BASE_URL
                                    }assets/images/icons.svg#add-icon`}
                                />
                            </svg>
                        </a>
                    </div>

                    <div className="banner-right-column">
                        <h2 className="banner-heading details-heading">
                            {media.name}
                        </h2>
                        <div className="details-meta">
                            <div className="meta-list">
                                <div className="meta-item">
                                    {media.first_air_date.split("-")[0]}
                                </div>
                                <div className="meta-item card-badge">
                                    {media?.content_ratings?.results?.find(
                                        (c) => c.iso_3166_1 === "US"
                                    )?.rating || ""}
                                </div>
                                <div className="meta-item">
                                    <img
                                        src={starIcon}
                                        width={20}
                                        height={20}
                                        alt="Rating"
                                    />
                                    <span>{media.vote_average.toFixed(1)}</span>
                                </div>
                            </div>

                            <p className="details-genre">
                                {getGenres(media.genres)}
                            </p>
                        </div>

                        <p className="details-text">{media.overview}</p>
                    </div>
                </div>
            </section>
        );
    }
};

export default DetailsBanner;
