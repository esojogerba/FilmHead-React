import React from "react";
import posterImg from "../assets/images/Blade Runner Poster.png";

const FolderPage = () => {
    return (
        <main>
            <article page-content="">
                <section className="container">
                    <div className="backlog-header">
                        <svg className="material-icon" id="backlog-svg">
                            <use
                                xlinkHref={`${
                                    import.meta.env.BASE_URL
                                }assets/images/icons.svg#folder`}
                            />
                        </svg>
                        <h1 className="folder-title">Creature Feature</h1>
                    </div>

                    <div className="backlog-menu">
                        <input
                            className="backlog-search-field"
                            type="search"
                            placeholder="Search..."
                        />

                        <a
                            className="btn-icon"
                            onClick={null}
                            id="backlog-add-btn"
                        >
                            <svg className="material-icon" id="add-svg">
                                <use
                                    xlinkHref={`${
                                        import.meta.env.BASE_URL
                                    }assets/images/icons.svg#filter`}
                                />
                            </svg>
                        </a>
                    </div>

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
                                    onClick={null}
                                >
                                    <svg
                                        className="material-icon"
                                        id="grid-card-trash-svg"
                                    >
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
                            <a
                                href=""
                                className="card-btn"
                                title=""
                                onClick={null}
                            ></a>
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
                                    onClick={null}
                                >
                                    <svg
                                        className="material-icon"
                                        id="grid-card-trash-svg"
                                    >
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
                            <a
                                href=""
                                className="card-btn"
                                title=""
                                onClick={null}
                            ></a>
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
                                    onClick={null}
                                >
                                    <svg
                                        className="material-icon"
                                        id="grid-card-trash-svg"
                                    >
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
                            <a
                                href=""
                                className="card-btn"
                                title=""
                                onClick={null}
                            ></a>
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
                                    onClick={null}
                                >
                                    <svg
                                        className="material-icon"
                                        id="grid-card-trash-svg"
                                    >
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
                            <a
                                href=""
                                className="card-btn"
                                title=""
                                onClick={null}
                            ></a>
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
                                    onClick={null}
                                >
                                    <svg
                                        className="material-icon"
                                        id="grid-card-trash-svg"
                                    >
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
                            <a
                                href=""
                                className="card-btn"
                                title=""
                                onClick={null}
                            ></a>
                        </div>
                    </div>
                </section>
            </article>
        </main>
    );
};

export default FolderPage;
