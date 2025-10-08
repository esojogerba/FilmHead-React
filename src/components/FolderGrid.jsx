import React from "react";
import { usePopup } from "../contexts/PopupContext";
import posterImg from "../assets/images/Blade Runner Poster.png";

const FolderGrid = () => {
    const { activePopup, openPopup, closePopup } = usePopup();

    return (
        <div className="grid-list folder-grid">
            <div className="grid-card">
                <figure className="poster-box grid-card-poster">
                    <img
                        src={posterImg}
                        alt="Blade Runner"
                        className="img-cover"
                        loading="lazy"
                    />
                    <a
                        className="grid-card-trash-btn"
                        onClick={() => openPopup("deleteItem")}
                    >
                        <svg className="material-icon" id="grid-card-trash-svg">
                            <use
                                xlinkHref={`${
                                    import.meta.env.BASE_URL
                                }assets/images/icons.svg#trash`}
                            />
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
                    <a
                        className="grid-card-trash-btn"
                        onClick={() => openPopup("deleteItem")}
                    >
                        <svg className="material-icon" id="grid-card-trash-svg">
                            <use
                                xlinkHref={`${
                                    import.meta.env.BASE_URL
                                }assets/images/icons.svg#trash`}
                            />
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
                    <a
                        className="grid-card-trash-btn"
                        onClick={() => openPopup("deleteItem")}
                    >
                        <svg className="material-icon" id="grid-card-trash-svg">
                            <use
                                xlinkHref={`${
                                    import.meta.env.BASE_URL
                                }assets/images/icons.svg#trash`}
                            />
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
                    <a
                        className="grid-card-trash-btn"
                        onClick={() => openPopup("deleteItem")}
                    >
                        <svg className="material-icon" id="grid-card-trash-svg">
                            <use
                                xlinkHref={`${
                                    import.meta.env.BASE_URL
                                }assets/images/icons.svg#trash`}
                            />
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
                    <a
                        className="grid-card-trash-btn"
                        onClick={() => openPopup("deleteItem")}
                    >
                        <svg className="material-icon" id="grid-card-trash-svg">
                            <use
                                xlinkHref={`${
                                    import.meta.env.BASE_URL
                                }assets/images/icons.svg#trash`}
                            />
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
    );
};

export default FolderGrid;
