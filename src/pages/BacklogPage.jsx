import React from "react";
import posterImg from "../assets/images/Blade Runner Poster.png";

const BacklogPage = () => {
    return (
        <main>
            <article page-content="">
                <section className="container">
                    <div className="backlog-header">
                        <svg className="material-icon" id="backlog-svg">
                            <use
                                xlinkHref={`${
                                    import.meta.env.BASE_URL
                                }assets/images/icons.svg#backlog`}
                            />
                        </svg>
                        <h1 id="backlog-title">Backlog</h1>
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
                                    }assets/images/icons.svg#add-icon`}
                                />
                            </svg>
                        </a>
                    </div>
                    <div className="backlog-grid">
                        <div className="folder">
                            <div className="folder-posters">
                                <figure className="poster-box folder-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                </figure>
                                <figure className="poster-box folder-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                </figure>
                                <figure className="poster-box folder-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                </figure>
                            </div>
                            <div className="folder-details">
                                <h3 className="folder-title">Folder Name</h3>
                                <p className="folder-entry-count">15 Entries</p>
                            </div>
                            <a
                                className="btn-icon"
                                onClick={null}
                                id="backlog-trash-btn"
                            >
                                <svg className="material-icon" id="trash-svg">
                                    <use
                                        xlinkHref={`${
                                            import.meta.env.BASE_URL
                                        }assets/images/icons.svg#trash`}
                                    />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="folder-btn"
                                title=""
                                onClick={null}
                            />
                        </div>
                        <div className="folder">
                            <div className="folder-posters">
                                <figure className="poster-box folder-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                </figure>
                                <figure className="poster-box folder-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                </figure>
                                <figure className="poster-box folder-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                </figure>
                            </div>
                            <div className="folder-details">
                                <h3 className="folder-title">Folder Name</h3>
                                <p className="folder-entry-count">15 Entries</p>
                            </div>
                            <a
                                className="btn-icon"
                                onClick={null}
                                id="backlog-trash-btn"
                            >
                                <svg className="material-icon" id="trash-svg">
                                    <use
                                        xlinkHref={`${
                                            import.meta.env.BASE_URL
                                        }assets/images/icons.svg#trash`}
                                    />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="folder-btn"
                                title=""
                                onClick={null}
                            />
                        </div>
                        <div className="folder">
                            <div className="folder-posters">
                                <figure className="poster-box folder-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                </figure>
                                <figure className="poster-box folder-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                </figure>
                                <figure className="poster-box folder-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                </figure>
                            </div>
                            <div className="folder-details">
                                <h3 className="folder-title">Folder Name</h3>
                                <p className="folder-entry-count">15 Entries</p>
                            </div>
                            <a
                                className="btn-icon"
                                onClick={null}
                                id="backlog-trash-btn"
                            >
                                <svg className="material-icon" id="trash-svg">
                                    <use
                                        xlinkHref={`${
                                            import.meta.env.BASE_URL
                                        }assets/images/icons.svg#trash`}
                                    />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="folder-btn"
                                title=""
                                onClick={null}
                            />
                        </div>
                        <div className="folder">
                            <div className="folder-posters">
                                <figure className="poster-box folder-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                </figure>
                                <figure className="poster-box folder-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                </figure>
                                <figure className="poster-box folder-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                </figure>
                            </div>
                            <div className="folder-details">
                                <h3 className="folder-title">Folder Name</h3>
                                <p className="folder-entry-count">15 Entries</p>
                            </div>
                            <a
                                className="btn-icon"
                                onClick={null}
                                id="backlog-trash-btn"
                            >
                                <svg className="material-icon" id="trash-svg">
                                    <use
                                        xlinkHref={`${
                                            import.meta.env.BASE_URL
                                        }assets/images/icons.svg#trash`}
                                    />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="folder-btn"
                                title=""
                                onClick={null}
                            />
                        </div>
                        <div className="folder">
                            <div className="folder-posters">
                                <figure className="poster-box folder-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                </figure>
                                <figure className="poster-box folder-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                </figure>
                                <figure className="poster-box folder-poster">
                                    <img
                                        src={posterImg}
                                        alt="Blade Runner"
                                        className="img-cover"
                                        loading="lazy"
                                    />
                                </figure>
                            </div>
                            <div className="folder-details">
                                <h3 className="folder-title">Folder Name</h3>
                                <p className="folder-entry-count">15 Entries</p>
                            </div>
                            <a
                                className="btn-icon"
                                onClick={null}
                                id="backlog-trash-btn"
                            >
                                <svg className="material-icon" id="trash-svg">
                                    <use
                                        xlinkHref={`${
                                            import.meta.env.BASE_URL
                                        }assets/images/icons.svg#trash`}
                                    />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="folder-btn"
                                title=""
                                onClick={null}
                            />
                        </div>
                    </div>
                </section>
            </article>
        </main>
    );
};

export default BacklogPage;
