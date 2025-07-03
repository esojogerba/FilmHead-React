import React from "react";
import bannerImg from "../assets/images/Blade Runner Banner.png";
import posterImg from "../assets/images/Blade Runner Poster.png";
import dropdownArrow from "../assets/images/dropdown-arrow.png";

const MoviesPage = () => {
    return (
        <article page-content="">
            <section className="banner">
                <div className="banner-slider-row">
                    <div className="banner-slider-item active">
                        <img
                            src={bannerImg}
                            alt=""
                            className="img-cover"
                            title="Blade Runner"
                            loading="eager"
                        />
                        <div className="banner-content">
                            <h2 className="banner-heading">Blade Runner</h2>
                            <p className="banner-text">
                                In the smog-choked dystopian Los Angeles of
                                2019, blade runner Rick Deckard is called out of
                                retirement to terminate a quartet of replicants
                                who have escaped to Earth seeking their creator
                                for a way to extend their short life spans.
                            </p>
                            <div className="meta-list">
                                <div className="meta-item">1982</div>
                                <div className="meta-item">1hr 58min</div>
                                <div className="meta-item card-badge">R</div>
                            </div>
                            <p className="banner-genre">
                                Science Fiction · Drama · Thriller
                            </p>
                            <div className="banner-buttons">
                                <a
                                    className="btn"
                                    href="movie-detials.html"
                                    onclick=""
                                >
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
                    <div className="banner-slider-item">
                        <img
                            src={bannerImg}
                            alt=""
                            className="img-cover"
                            title="Blade Runner"
                            loading="eager"
                        />
                        <div className="banner-content">
                            <h2 className="banner-heading">Blade Runner</h2>
                            <p className="banner-text">
                                In the smog-choked dystopian Los Angeles of
                                2019, blade runner Rick Deckard is called out of
                                retirement to terminate a quartet of replicants
                                who have escaped to Earth seeking their creator
                                for a way to extend their short life spans.
                            </p>
                            <div className="meta-list">
                                <div className="meta-item">1982</div>
                                <div className="meta-item">1hr 58min</div>
                                <div className="meta-item card-badge">R</div>
                            </div>
                            <p className="banner-genre">
                                Science Fiction · Drama · Thriller
                            </p>
                            <div className="banner-buttons">
                                <a
                                    className="btn"
                                    href="movie-detials.html"
                                    onclick=""
                                >
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
                </div>
                <div className="banner-control-row">
                    <div className="banner-control-inner">
                        <button className="banner-control-item poster-box active">
                            <img
                                src={posterImg}
                                alt="Blade Runner"
                                loading="lazy"
                                draggable="false"
                                className="img-cover"
                            />
                        </button>
                        <button className="banner-control-item poster-box">
                            <img
                                src={posterImg}
                                alt="Blade Runner"
                                loading="lazy"
                                draggable="false"
                                className="img-cover"
                            />
                        </button>
                        <button className="banner-control-item poster-box">
                            <img
                                src={posterImg}
                                alt="Blade Runner"
                                loading="lazy"
                                draggable="false"
                                className="img-cover"
                            />
                        </button>
                        <button className="banner-control-item poster-box">
                            <img
                                src={posterImg}
                                alt="Blade Runner"
                                loading="lazy"
                                draggable="false"
                                className="img-cover"
                            />
                        </button>
                    </div>
                </div>
            </section>
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
