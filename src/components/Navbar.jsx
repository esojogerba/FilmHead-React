import React from "react";
import navbarLogo from "../assets/images/filmhead-nav-logo.svg";
import logo from "../assets/images/FilmHead-logo.png";

const Navbar = () => {
    return (
        <header className="container primary-header">
            <div>
                <a href="index.html" className="desktop-nav-logo">
                    <img
                        src={navbarLogo}
                        alt="FilmHead logo"
                        id="nav-logo-img"
                    />
                </a>
            </div>
            <div>
                <a href="index.html" className="mobile-nav-logo">
                    <img src={logo} alt="FilmHead logo" id="nav-logo-img" />
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
            <nav className="nav-links" id="nav-links" data-visible="false">
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
                        <a href="html/sign-up.html" id="nav-link-sign-up">
                            Sign Up
                        </a>
                    </li>
                    <li>
                        <a href="html/log-in.html">Log In</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
