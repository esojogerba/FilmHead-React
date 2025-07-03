import React from "react";
import bannerImg from "../assets/images/Blade Runner Banner.png";
import posterImg from "../assets/images/Blade Runner Poster.png";

// TODO: API integration
// TODO: slider timer
// TODO: Routing to details page
// TODO: add to folder pop up integration

const MovieHeroSlider = () => {
    return (
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
                            In the smog-choked dystopian Los Angeles of 2019,
                            blade runner Rick Deckard is called out of
                            retirement to terminate a quartet of replicants who
                            have escaped to Earth seeking their creator for a
                            way to extend their short life spans.
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
                            In the smog-choked dystopian Los Angeles of 2019,
                            blade runner Rick Deckard is called out of
                            retirement to terminate a quartet of replicants who
                            have escaped to Earth seeking their creator for a
                            way to extend their short life spans.
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
    );
};

export default MovieHeroSlider;
