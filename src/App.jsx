import React from "react";

const App = () => {
    return (
        <>
            <>
                <header className="container primary-header">
                    <div>
                        <a href="index.html" className="desktop-nav-logo">
                            <img
                                src="/assets/images/filmhead-nav-logo.svg"
                                alt="FilmHead logo"
                                id="nav-logo-img"
                            />
                        </a>
                    </div>
                    <div>
                        <a href="index.html" className="mobile-nav-logo">
                            <img
                                src="/assets/images/FilmHead-logo.png"
                                alt="FilmHead logo"
                                id="nav-logo-img"
                            />
                        </a>
                    </div>
                    <div className="search-box-mobile">
                        <input
                            className="search-field"
                            type="search"
                            placeholder="Search..."
                        />
                    </div>
                    <button
                        className="mobile-nav-toggle"
                        aria-controls="primary-navigation"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Menu</span>
                    </button>
                    <nav
                        className="nav-links"
                        id="nav-links"
                        data-visible="false"
                    >
                        <ul role="list" className="nav-links-left">
                            <li>
                                <a href="/html/movies.html">Movies</a>
                            </li>
                            <li>
                                <a href="/html/shows.html">Shows</a>
                            </li>
                            <li>
                                <a href="/html/backlog.html">Backlog</a>
                            </li>
                        </ul>
                        <ul role="list" className="nav-links-right">
                            <li className="search-box-desktop">
                                <input
                                    className="search-field"
                                    type="search"
                                    placeholder="Search..."
                                />
                            </li>
                            <li>
                                <a
                                    href="html/sign-up.html"
                                    id="nav-link-sign-up"
                                >
                                    Sign Up
                                </a>
                            </li>
                            <li>
                                <a href="html/log-in.html">Log In</a>
                            </li>
                        </ul>
                    </nav>
                </header>

                <div className="transition transition-1">
                    <div className="spinner" />
                </div>

                <main>
                    <section className="cta">
                        <h1 className="cta-heading">Nothing To Watch?</h1>
                        <h1 className="cta-heading">Not Anymore!</h1>
                        <p className="cta-p">
                            Keep track of your media backlog so that you always
                            have something to scratch your entertainment itch.
                        </p>
                        <button className="btn cta-btn" id="new-account-btn">
                            Create An Account
                        </button>
                    </section>
                    <div className="container home-bg-circles">
                        <section className="features">
                            <div className="features-columns">
                                <div className="features-left-col">
                                    <h2 className="features-title">Organize</h2>
                                    <h2 className="features-title">
                                        &amp; Conquer
                                    </h2>
                                </div>
                                <div className="features-right-col">
                                    <div className="features-row">
                                        <div className="features-card">
                                            <div className="features-card-icon">
                                                <svg
                                                    className="material-icon"
                                                    id="movies&shows-svg"
                                                >
                                                    <use xlinkHref="assets/images/icons.svg#shows" />
                                                </svg>
                                            </div>
                                            <h3 className="features-card-title">
                                                Movies &amp; Shows
                                            </h3>
                                            <p className="features-card-body">
                                                Browse and stockpile thousands
                                                of your favorite movies and tv
                                                shows.
                                            </p>
                                        </div>
                                        <div className="features-card">
                                            <div className="features-card-icon">
                                                <svg
                                                    className="material-icon"
                                                    id="folders-svg"
                                                >
                                                    <use xlinkHref="assets/images/icons.svg#folders" />
                                                </svg>
                                            </div>
                                            <h3 className="features-card-title">
                                                Folders
                                            </h3>
                                            <p className="features-card-body">
                                                Create unlimited folders to
                                                organize and categorize your
                                                backlog.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="features-row">
                                        <div className="features-card">
                                            <div className="features-card-icon">
                                                <svg
                                                    className="material-icon"
                                                    id="store-svg"
                                                >
                                                    <use xlinkHref="assets/images/icons.svg#store" />
                                                </svg>
                                            </div>
                                            <h3 className="features-card-title">
                                                Store
                                            </h3>
                                            <p className="features-card-body">
                                                Store all of your folders in
                                                your account for quick and easy
                                                access.
                                            </p>
                                        </div>
                                        <div className="features-card">
                                            <div className="features-card-icon">
                                                <svg
                                                    className="material-icon"
                                                    id="watch-svg"
                                                >
                                                    <use xlinkHref="assets/images/icons.svg#watch" />
                                                </svg>
                                            </div>
                                            <h3 className="features-card-title">
                                                Watch
                                            </h3>
                                            <p className="features-card-body">
                                                View streaming availability and
                                                start conquering your backlog
                                                today.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <img
                            className="home-bg-circle-top"
                            src="/assets/images/bg-circle-1.png"
                            alt="background decorative circle"
                        />
                        <img
                            className="home-bg-circle-bottom"
                            src="/assets/images/bg-circle-2.png"
                            alt="background decorative circle"
                        />
                    </div>
                    <div className="pop-up-overlay" />
                    <div className="pop-up-overlay second-overlay" />
                </main>
                <footer>
                    <div className="container">
                        <div className="footer-flex">
                            <div className="footer-logo">
                                <a href="index.html">
                                    <img
                                        src="/assets/images/filmhead-footer-logo.svg"
                                        alt="FilmHead footer logo"
                                        height="50px"
                                    />
                                </a>
                            </div>
                            <div className="footer-github">
                                <a
                                    href="https://github.com/esojogerba/FilmHead"
                                    id="github-link"
                                >
                                    <svg
                                        className="material-icon"
                                        id="github-icon-svg"
                                        height="30px"
                                    >
                                        <use xlinkHref="/assets/images/icons.svg#github-logo" />
                                    </svg>
                                </a>
                                <p>© 2023 FilmHead. All rights reserved.</p>
                            </div>
                            <div className="footer-tmdb">
                                <p>Powered by</p>
                                <a href="https://www.themoviedb.org/">
                                    <img
                                        src="/assets/images/tmdb-logo.svg"
                                        alt="The Movie Database logo"
                                        height="20px"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom" />
                </footer>
            </>
        </>
    );
};

export default App;
