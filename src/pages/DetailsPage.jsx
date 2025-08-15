import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { imageBaseURL, API_KEY, fetchDataFromAPI } from "../utils/api";
import bannerImg from "../assets/images/Blade Runner Banner.png";
import posterImg from "../assets/images/Blade Runner Poster.png";
import starIcon from "../assets/images/star-icon.svg";
import huluLogo from "../assets/images/hulu-logo.jpg";

// TODO: determine media type and use appropriate fetch url
// TODO: inject media data into page
// TODO: split page in to components and pass in movie data if necessary
// TODO: functions for:

const DetailsPage = () => {
    const { type, id } = useParams();
    const [genres, setGenres] = useState({});
    const [media, setMedia] = useState(null);

    // Fetch genres
    useEffect(() => {
        // Fetch all genres. Example: [ { "id": "123", "name": "Action" } ]
        // Then change genre format to {123: "Action"}
        const genreList = {
            // Assign correct genre string to each genre_id provided. Example: [23 , 43] = "Action, Romance".
            asString(genreIdList) {
                // Will hold list of genre strings.
                let newGenreList = [];

                for (const genreId of genreIdList) {
                    // If current genreId exists in genreList, push it to newGenreList.
                    // this == genreList
                    this[genreId] && newGenreList.push(this[genreId]);
                }
                return newGenreList.join(" · ");
            },
        };

        const fetchGenres = async () => {
            let apiUrl = ``;

            if (type === "movie") {
                apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
            } else if (type === "show") {
                apiUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`;
            }

            try {
                const res = await fetch(apiUrl);
                const data = await res.json();

                for (const { id, name } of data.genres) {
                    genreList[id] = name;
                }
                setGenres(genreList);
            } catch (error) {
                console.log("Error fetching data", data);
            }
        };

        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchMedia = async () => {
            let apiUrl = ``;

            if (type === "movie") {
                apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=casts,videos,images,releases`;
            } else if (type === "show") {
                apiUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&append_to_response=credits,videos,images,content_ratings`;
            }

            try {
                const res = await fetch(apiUrl);
                const data = await res.json();

                console.log(data);
                setMedia(data.results);
            } catch (error) {
                console.log("Error fetching data", data);
            }
        };

        fetchMedia();
    }, []);

    return (
        <main>
            <article page-content="">
                {/* Details Banner */}
                <section className="banner details-banner">
                    <div
                        className="backdrop-image"
                        style={{
                            backgroundImage: `linear-gradient(var(--details-overlay)), url(${bannerImg})`,
                        }}
                    ></div>
                    <div className="banner-columns">
                        <div className="banner-left-column">
                            <figure className="poster-box details-poster">
                                <img
                                    src={posterImg}
                                    alt="Blade Runner"
                                    className="img-cover"
                                />
                            </figure>
                            <a
                                className="btn btn-text-icon"
                                href=""
                                onClick={() => null}
                            >
                                <span>Add to Folder</span>
                                <svg
                                    className="material-icon"
                                    id="card-add-svg"
                                >
                                    <use xlinkHref="./assets/images/icons.svg#add-icon" />
                                </svg>
                            </a>
                        </div>
                        <div className="banner-right-column">
                            <h2 className="banner-heading details-heading">
                                Blade Runner
                            </h2>
                            <div className="details-meta">
                                <div className="meta-list">
                                    <div className="meta-item">1982</div>
                                    <div className="meta-item">1hr 58min</div>
                                    <div className="meta-item card-badge">
                                        R
                                    </div>
                                    <div className="meta-item">
                                        <img
                                            src={starIcon}
                                            width={20}
                                            height={20}
                                            alt="Rating"
                                        />
                                        <span>7.9</span>
                                    </div>
                                </div>
                                <p className="details-genre">
                                    Science Fiction · Drama · Thriller
                                </p>
                            </div>
                            <p className="details-text">
                                In the smog-choked dystopian Los Angeles of
                                2019, blade runner Rick Deckard is called out of
                                retirement to terminate a quartet of replicants
                                who have escaped to Earth seeking their creator
                                for a way to extend their short life spans.
                            </p>
                            <div className="details-cast">
                                <p className="cast-title">Starring</p>
                                <p className="cast-body">
                                    Harrison Ford, Rutger Hauer, Sean Young,
                                    Edward James Olmos, M. Emmet Walsh, Daryl
                                    Hannah, William Sanderson, Brion James, Joe
                                    Turkel, Joanna Cassidy
                                </p>
                            </div>
                            <div className="details-director">
                                <p className="director-title">Directed By</p>
                                <p className="director-body">Ridley Scott</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Available On */}
                <section className="media-scroll container">
                    <div className="media-scroll-title-wrapper">
                        <h3 className="media-scroll-title">
                            Available On (US)
                        </h3>
                    </div>
                    <div className="media-slider-list">
                        <div className="slider-list-inner watch-col">
                            <div className="watch-stream-col">
                                <h4 className="watch-header">Stream</h4>
                                <div className="watch-platforms-row">
                                    <img
                                        className="watch-logo"
                                        src={huluLogo}
                                        alt="Hulu"
                                    />
                                    <img
                                        className="watch-logo"
                                        src={huluLogo}
                                        alt="Hulu"
                                    />
                                    <img
                                        className="watch-logo"
                                        src={huluLogo}
                                        alt="Hulu"
                                    />
                                </div>
                            </div>
                            <div className="watch-rent-col">
                                <h4 className="watch-header">Rent</h4>
                                <div className="watch-platforms-row">
                                    <img
                                        className="watch-logo"
                                        src={huluLogo}
                                        alt="Hulu"
                                    />
                                    <img
                                        className="watch-logo"
                                        src={huluLogo}
                                        alt="Hulu"
                                    />
                                    <img
                                        className="watch-logo"
                                        src={huluLogo}
                                        alt="Hulu"
                                    />
                                </div>
                            </div>
                            <div className="watch-buy-col">
                                <h4 className="watch-header">Buy</h4>
                                <div className="watch-platforms-row">
                                    <img
                                        className="watch-logo"
                                        src={huluLogo}
                                        alt="Hulu"
                                    />
                                    <img
                                        className="watch-logo"
                                        src={huluLogo}
                                        alt="Hulu"
                                    />
                                    <img
                                        className="watch-logo"
                                        src={huluLogo}
                                        alt="Hulu"
                                    />
                                </div>
                            </div>
                            <h4 className="watch-header">
                                Not Available in US
                            </h4>
                        </div>
                    </div>
                </section>
                {/* Trailers & Clips */}
                <section className="media-scroll container">
                    <div className="media-scroll-title-wrapper">
                        <h3 className="media-scroll-title">
                            Trailers &amp; Clips
                        </h3>
                    </div>
                    <div className="media-slider-list">
                        <div className="slider-list-inner">
                            <div className="video-card">
                                <iframe
                                    width={500}
                                    height={294}
                                    src={null}
                                    frameBorder={0}
                                    allowFullScreen={1}
                                    title="Blade Runner Trailer"
                                    className="img-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="video-card">
                                <iframe
                                    width={500}
                                    height={294}
                                    src={null}
                                    frameBorder={0}
                                    allowFullScreen={1}
                                    title="Blade Runner Trailer"
                                    className="img-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="video-card">
                                <iframe
                                    width={500}
                                    height={294}
                                    src={null}
                                    frameBorder={0}
                                    allowFullScreen={1}
                                    title="Blade Runner Trailer"
                                    className="img-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="video-card">
                                <iframe
                                    width={500}
                                    height={294}
                                    src={null}
                                    frameBorder={0}
                                    allowFullScreen={1}
                                    title="Blade Runner Trailer"
                                    className="img-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="video-card">
                                <iframe
                                    width={500}
                                    height={294}
                                    src={null}
                                    frameBorder={0}
                                    allowFullScreen={1}
                                    title="Blade Runner Trailer"
                                    className="img-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="video-card">
                                <iframe
                                    width={500}
                                    height={294}
                                    src={null}
                                    frameBorder={0}
                                    allowFullScreen={1}
                                    title="Blade Runner Trailer"
                                    className="img-cover"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                {/* You May Also Like */}
                <section className="media-scroll container">
                    <div className="media-scroll-title-wrapper">
                        <h3 className="media-scroll-title">
                            You May Also Like
                        </h3>
                        <a href="" className="view-more-link">
                            View More
                        </a>
                    </div>
                    <div className="media-slider-list">
                        <div className="slider-list-inner">
                            <div className="media-card">
                                <figure className="poster-box card-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                    <a href="" className="media-card-add-btn">
                                        <svg
                                            className="material-icon"
                                            id="card-add-svg"
                                        >
                                            <use xlinkHref="./assets/images/icons.svg#add-icon" />
                                        </svg>
                                    </a>
                                </figure>
                                <h4 className="media-card-title">
                                    Blade Runner
                                </h4>
                                <div className="meta-list media-card-meta">
                                    <div className="meta-list">
                                        <div className="meta-item">1982</div>
                                        <div className="meta-item">
                                            1hr 58min
                                        </div>
                                    </div>
                                    <div className="card-badge">R</div>
                                </div>
                                <p className="media-card-genres">
                                    Science Fiction · Drama · Thriller
                                </p>
                                <a
                                    href=""
                                    className="card-btn"
                                    title=""
                                    onClick={() => null}
                                />
                            </div>
                            <div className="media-card">
                                <figure className="poster-box card-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                    <a href="" className="media-card-add-btn">
                                        <svg
                                            className="material-icon"
                                            id="card-add-svg"
                                        >
                                            <use xlinkHref="./assets/images/icons.svg#add-icon" />
                                        </svg>
                                    </a>
                                </figure>
                                <h4 className="media-card-title">
                                    Blade Runner
                                </h4>
                                <div className="meta-list media-card-meta">
                                    <div className="meta-list">
                                        <div className="meta-item">1982</div>
                                        <div className="meta-item">
                                            1hr 58min
                                        </div>
                                    </div>
                                    <div className="card-badge">R</div>
                                </div>
                                <p className="media-card-genres">
                                    Science Fiction · Drama · Thriller
                                </p>
                                <a
                                    href=""
                                    className="card-btn"
                                    title=""
                                    onClick={() => null}
                                />
                            </div>
                            <div className="media-card">
                                <figure className="poster-box card-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                    <a href="" className="media-card-add-btn">
                                        <svg
                                            className="material-icon"
                                            id="card-add-svg"
                                        >
                                            <use xlinkHref="./assets/images/icons.svg#add-icon" />
                                        </svg>
                                    </a>
                                </figure>
                                <h4 className="media-card-title">
                                    Blade Runner
                                </h4>
                                <div className="meta-list media-card-meta">
                                    <div className="meta-list">
                                        <div className="meta-item">1982</div>
                                        <div className="meta-item">
                                            1hr 58min
                                        </div>
                                    </div>
                                    <div className="card-badge">R</div>
                                </div>
                                <p className="media-card-genres">
                                    Science Fiction · Drama · Thriller
                                </p>
                                <a
                                    href=""
                                    className="card-btn"
                                    title=""
                                    onClick={() => null}
                                />
                            </div>
                            <div className="media-card">
                                <figure className="poster-box card-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                    <a href="" className="media-card-add-btn">
                                        <svg
                                            className="material-icon"
                                            id="card-add-svg"
                                        >
                                            <use xlinkHref="./assets/images/icons.svg#add-icon" />
                                        </svg>
                                    </a>
                                </figure>
                                <h4 className="media-card-title">
                                    Blade Runner
                                </h4>
                                <div className="meta-list media-card-meta">
                                    <div className="meta-list">
                                        <div className="meta-item">1982</div>
                                        <div className="meta-item">
                                            1hr 58min
                                        </div>
                                    </div>
                                    <div className="card-badge">R</div>
                                </div>
                                <p className="media-card-genres">
                                    Science Fiction · Drama · Thriller
                                </p>
                                <a
                                    href=""
                                    className="card-btn"
                                    title=""
                                    onClick={() => null}
                                />
                            </div>
                            <div className="media-card">
                                <figure className="poster-box card-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                    <a href="" className="media-card-add-btn">
                                        <svg
                                            className="material-icon"
                                            id="card-add-svg"
                                        >
                                            <use xlinkHref="./assets/images/icons.svg#add-icon" />
                                        </svg>
                                    </a>
                                </figure>
                                <h4 className="media-card-title">
                                    Blade Runner
                                </h4>
                                <div className="meta-list media-card-meta">
                                    <div className="meta-list">
                                        <div className="meta-item">1982</div>
                                        <div className="meta-item">
                                            1hr 58min
                                        </div>
                                    </div>
                                    <div className="card-badge">R</div>
                                </div>
                                <p className="media-card-genres">
                                    Science Fiction · Drama · Thriller
                                </p>
                                <a
                                    href=""
                                    className="card-btn"
                                    title=""
                                    onClick={() => null}
                                />
                            </div>
                            <div className="media-card">
                                <figure className="poster-box card-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                    <a href="" className="media-card-add-btn">
                                        <svg
                                            className="material-icon"
                                            id="card-add-svg"
                                        >
                                            <use xlinkHref="./assets/images/icons.svg#add-icon" />
                                        </svg>
                                    </a>
                                </figure>
                                <h4 className="media-card-title">
                                    Blade Runner
                                </h4>
                                <div className="meta-list media-card-meta">
                                    <div className="meta-list">
                                        <div className="meta-item">1982</div>
                                        <div className="meta-item">
                                            1hr 58min
                                        </div>
                                    </div>
                                    <div className="card-badge">R</div>
                                </div>
                                <p className="media-card-genres">
                                    Science Fiction · Drama · Thriller
                                </p>
                                <a
                                    href=""
                                    className="card-btn"
                                    title=""
                                    onClick={() => null}
                                />
                            </div>
                            <div className="media-card">
                                <figure className="poster-box card-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                    <a href="" className="media-card-add-btn">
                                        <svg
                                            className="material-icon"
                                            id="card-add-svg"
                                        >
                                            <use xlinkHref="./assets/images/icons.svg#add-icon" />
                                        </svg>
                                    </a>
                                </figure>
                                <h4 className="media-card-title">
                                    Blade Runner
                                </h4>
                                <div className="meta-list media-card-meta">
                                    <div className="meta-list">
                                        <div className="meta-item">1982</div>
                                        <div className="meta-item">
                                            1hr 58min
                                        </div>
                                    </div>
                                    <div className="card-badge">R</div>
                                </div>
                                <p className="media-card-genres">
                                    Science Fiction · Drama · Thriller
                                </p>
                                <a
                                    href=""
                                    className="card-btn"
                                    title=""
                                    onClick={() => null}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </article>
        </main>
    );
};

export default DetailsPage;
