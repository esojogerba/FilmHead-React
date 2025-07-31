import React from "react";
import { useState, useEffect, useRef } from "react";
import { imageBaseURL, API_KEY, fetchDataFromAPI } from "../utils/api";
import bannerImg from "../assets/images/Blade Runner Banner.png";
import posterImg from "../assets/images/Blade Runner Poster.png";
import MovieHeroSlider from "../components/MovieHeroSlider";
import MediaPageHeader from "../components/MediaPageHeader";

const MoviesPage = () => {
    const [genres, setGenres] = useState({});

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
            const apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();

                for (const { id, name } of data.genres) {
                    genreList[id] = name;
                }
                console.log(genreList);
                setGenres(genreList);
            } catch (error) {
                console.log("Error fetching data", data);
            }
        };

        fetchGenres();
    }, []);

    return (
        <article page-content="">
            <MovieHeroSlider genres={genres} />
            <article className="container">
                <MediaPageHeader />
                <section className="media-scroll">
                    <div className="media-scroll-title-wrapper">
                        <h3 className="media-scroll-title">Trending</h3>
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
                                    onclick=""
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
                                    onclick=""
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
                                    onclick=""
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
                                    onclick=""
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
                                    onclick=""
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
                                    onclick=""
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
                                    onclick=""
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="media-scroll">
                    <div className="media-scroll-title-wrapper">
                        <h3 className="media-scroll-title">Trending</h3>
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
                                    onclick=""
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
                                    onclick=""
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
                                    onclick=""
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
                                    onclick=""
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
                                    onclick=""
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
                                    onclick=""
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
                                    onclick=""
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="media-scroll">
                    <div className="media-scroll-title-wrapper">
                        <h3 className="media-scroll-title">Trending</h3>
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
                                    onclick=""
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
                                    onclick=""
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
                                    onclick=""
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
                                    onclick=""
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
                                    onclick=""
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
                                    onclick=""
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
                                    onclick=""
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </article>
        </article>
    );
};

export default MoviesPage;
