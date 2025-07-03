import React from "react";
import bannerImg from "../assets/images/Blade Runner Banner.png";
import posterImg from "../assets/images/Blade Runner Poster.png";
import dropdownArrow from "../assets/images/dropdown-arrow.png";
import MovieHeroSlider from "../components/MovieHeroSlider";

const MoviesPage = () => {
    return (
        <article page-content="">
            <MovieHeroSlider />
            <article className="container">
                <section className="media-page-header">
                    <h1 className="media-page-title">Movies</h1>
                    <div className="genre-dropdown">
                        <button
                            onclick="toggleDropdown()"
                            className="dropdown-btn"
                        >
                            <span>Genres</span>
                            <img src={dropdownArrow} />
                        </button>
                        <div id="movies-dropdown" className="dropdown-menu">
                            <a href="#">Science Fiction</a>
                            <a href="#">Genre 2</a>
                            <a href="#">Genre 3</a>
                            <a href="#">Genre 3</a>
                            <a href="#">Genre 3</a>
                            <a href="#">Genre 3</a>
                            <a href="#">Genre 3</a>
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
