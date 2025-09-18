import React from "react";
import searchIcon from "../assets/images/search-icon-white.svg";
import posterImg from "../assets/images/Blade Runner Poster.png";

const MediaGridPage = () => {
    return (
        <main>
            <article page-content>
                <section class="media-grid container">
                    <div class="grid-header">
                        <img
                            src={searchIcon}
                            alt="Search"
                            className="material-icon"
                            id="grid-search-svg"
                        />
                        <h1 class="grid-title">Science Fiction · Movies</h1>
                    </div>

                    <div class="grid-list">
                        <div class="grid-card">
                            <figure class="poster-box grid-card-poster">
                                <img
                                    src={posterImg}
                                    alt="Blade Runner"
                                    class="img-cover"
                                    loading="lazy"
                                />
                                <a href="" class="grid-card-add-btn">
                                    <svg
                                        className="material-icon"
                                        id="card-add-svg"
                                    >
                                        <use xlinkHref="./assets/images/icons.svg#add-icon" />
                                    </svg>
                                </a>
                            </figure>
                            <h4 class="media-card-title">Blade Runner</h4>
                            <div class="meta-list media-card-meta">
                                <div class="meta-list">
                                    <div class="meta-item">1982</div>
                                </div>
                            </div>
                            <a href="" class="card-btn" title="" onclick=""></a>
                        </div>
                        <div class="grid-card">
                            <figure class="poster-box grid-card-poster">
                                <img
                                    src={posterImg}
                                    alt="Blade Runner"
                                    class="img-cover"
                                    loading="lazy"
                                />
                                <a href="" class="grid-card-add-btn">
                                    <svg
                                        className="material-icon"
                                        id="card-add-svg"
                                    >
                                        <use xlinkHref="./assets/images/icons.svg#add-icon" />
                                    </svg>
                                </a>
                            </figure>
                            <h4 class="media-card-title">Blade Runner</h4>
                            <div class="meta-list media-card-meta">
                                <div class="meta-list">
                                    <div class="meta-item">1982</div>
                                </div>
                            </div>
                            <a href="" class="card-btn" title="" onclick=""></a>
                        </div>
                        <div class="grid-card">
                            <figure class="poster-box grid-card-poster">
                                <img
                                    src={posterImg}
                                    alt="Blade Runner"
                                    class="img-cover"
                                    loading="lazy"
                                />
                                <a href="" class="grid-card-add-btn">
                                    <svg
                                        className="material-icon"
                                        id="card-add-svg"
                                    >
                                        <use xlinkHref="./assets/images/icons.svg#add-icon" />
                                    </svg>
                                </a>
                            </figure>
                            <h4 class="media-card-title">Blade Runner</h4>
                            <div class="meta-list media-card-meta">
                                <div class="meta-list">
                                    <div class="meta-item">1982</div>
                                </div>
                            </div>
                            <a href="" class="card-btn" title="" onclick=""></a>
                        </div>
                        <div class="grid-card">
                            <figure class="poster-box grid-card-poster">
                                <img
                                    src={posterImg}
                                    alt="Blade Runner"
                                    class="img-cover"
                                    loading="lazy"
                                />
                                <a href="" class="grid-card-add-btn">
                                    <svg
                                        className="material-icon"
                                        id="card-add-svg"
                                    >
                                        <use xlinkHref="./assets/images/icons.svg#add-icon" />
                                    </svg>
                                </a>
                            </figure>
                            <h4 class="media-card-title">Blade Runner</h4>
                            <div class="meta-list media-card-meta">
                                <div class="meta-list">
                                    <div class="meta-item">1982</div>
                                </div>
                            </div>
                            <a href="" class="card-btn" title="" onclick=""></a>
                        </div>
                    </div>

                    <button class="btn load-more">Load More</button>
                </section>
            </article>
        </main>
    );
};

export default MediaGridPage;
