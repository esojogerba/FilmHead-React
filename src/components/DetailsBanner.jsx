import React from "react";
import bannerImg from "../assets/images/Blade Runner Banner.png";
import posterImg from "../assets/images/Blade Runner Poster.png";
import starIcon from "../assets/images/star-icon.svg";

const DetailsBanner = ({ type, genres, media, imageBaseURL }) => {
    // Calculates hours in runtime.
    const calcRuntimeHours = function (runtime) {
        const hours = Math.floor(parseInt(runtime) / 60);

        if (hours == 0) {
            return "";
        } else {
            return hours.toString() + "h";
        }
    };

    // Calculates remaining minutes in runtime.
    const calcRuntimeMinutes = function (runtime) {
        const minutes = parseInt(runtime) % 60;

        return " " + minutes.toString() + "m";
    };

    // Returns the movie's genres separated by a '·'.
    const getGenres = function (genreList) {
        const newGenreList = [];

        // Pushes the names of the movie's genres into newGenreList.
        for (const { name } of genreList) newGenreList.push(name);

        return newGenreList.join(" · ");
    };

    // Returns the movie's cast list separated by a ','.
    // Ten cast members is the max length of the list.
    const getCasts = function (castList) {
        const newCastList = [];

        // Pushes cast names into newCastList.
        // A maximum of 10 names can be pushed.
        for (let i = 0, len = castList.length; i < len && i < 10; i++) {
            const { name } = castList[i];
            newCastList.push(name);
        }

        return newCastList.join(", ");
    };

    const getDirectors = function (crewList) {
        //  Gets the directors from the crewList
        const directors = crewList.filter(({ job }) => job === "Director");

        const directorList = [];

        // Pushes all the names of the directors into directorList.
        for (const { name } of directors) directorList.push(name);

        return directorList.join(", ");
    };

    return (
        <section className="banner details-banner">
            <div
                className="backdrop-image"
                style={{
                    backgroundImage: `linear-gradient(var(--details-overlay)), url(${
                        media.backdrop_path != null
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
                                media.poster_path != null
                                    ? imageBaseURL + "w342" + media.poster_path
                                    : "#"
                            }
                            alt={media.title}
                            className="img-cover"
                        />
                    </figure>
                    <a
                        className="btn btn-text-icon"
                        href=""
                        onClick={() => null}
                    >
                        <span>Add to Folder</span>
                        <svg className="material-icon" id="details-add-svg">
                            <use xlinkHref="/assets/images/icons.svg#add-icon" />
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
                            {getCasts(media?.casts?.cast)}
                        </p>
                    </div>
                    <div className="details-director">
                        <p className="director-title">Directed By</p>
                        <p className="director-body">
                            {getDirectors(media?.casts?.crew)}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailsBanner;
