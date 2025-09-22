import React from "react";
import posterImg from "../assets/images/Blade Runner Poster.png";

const GridList = () => {
    return (
        <>
            <div className="grid-list">
                <div className="grid-card">
                    <figure className="poster-box grid-card-poster">
                        <img
                            src={posterImg}
                            alt="Blade Runner"
                            className="img-cover"
                            loading="lazy"
                        />
                        <a href="" className="grid-card-add-btn">
                            <svg className="material-icon" id="card-add-svg">
                                <use xlinkHref="./assets/images/icons.svg#add-icon" />
                            </svg>
                        </a>
                    </figure>
                    <h4 className="media-card-title">Blade Runner</h4>
                    <div className="meta-list media-card-meta">
                        <div className="meta-list">
                            <div className="meta-item">1982</div>
                        </div>
                    </div>
                    <a href="" className="card-btn" title="" onClick={null}></a>
                </div>
                <div className="grid-card">
                    <figure className="poster-box grid-card-poster">
                        <img
                            src={posterImg}
                            alt="Blade Runner"
                            className="img-cover"
                            loading="lazy"
                        />
                        <a href="" className="grid-card-add-btn">
                            <svg className="material-icon" id="card-add-svg">
                                <use xlinkHref="./assets/images/icons.svg#add-icon" />
                            </svg>
                        </a>
                    </figure>
                    <h4 className="media-card-title">Blade Runner</h4>
                    <div className="meta-list media-card-meta">
                        <div className="meta-list">
                            <div className="meta-item">1982</div>
                        </div>
                    </div>
                    <a href="" className="card-btn" title="" onClick={null}></a>
                </div>
                <div className="grid-card">
                    <figure className="poster-box grid-card-poster">
                        <img
                            src={posterImg}
                            alt="Blade Runner"
                            className="img-cover"
                            loading="lazy"
                        />
                        <a href="" className="grid-card-add-btn">
                            <svg className="material-icon" id="card-add-svg">
                                <use xlinkHref="./assets/images/icons.svg#add-icon" />
                            </svg>
                        </a>
                    </figure>
                    <h4 className="media-card-title">Blade Runner</h4>
                    <div className="meta-list media-card-meta">
                        <div className="meta-list">
                            <div className="meta-item">1982</div>
                        </div>
                    </div>
                    <a href="" className="card-btn" title="" onClick={null}></a>
                </div>
                <div className="grid-card">
                    <figure className="poster-box grid-card-poster">
                        <img
                            src={posterImg}
                            alt="Blade Runner"
                            className="img-cover"
                            loading="lazy"
                        />
                        <a href="" className="grid-card-add-btn">
                            <svg className="material-icon" id="card-add-svg">
                                <use xlinkHref="./assets/images/icons.svg#add-icon" />
                            </svg>
                        </a>
                    </figure>
                    <h4 className="media-card-title">Blade Runner</h4>
                    <div className="meta-list media-card-meta">
                        <div className="meta-list">
                            <div className="meta-item">1982</div>
                        </div>
                    </div>
                    <a href="" className="card-btn" title="" onClick={null}></a>
                </div>
            </div>

            <button className="btn load-more">Load More</button>
        </>
    );
};

export default GridList;
