import React, { useState } from "react";
import navbarLogo from "../assets/images/filmhead-nav-logo.svg";
import logo from "../assets/images/FilmHead-logo.png";
import hamburgerIcon from "../assets/images/icon-hamburger.svg";
import closeIcon from "../assets/images/icon-close.svg";

const Navbar = () => {
    const [navVisible, setNavVisible] = useState(false);

    const toggleNav = () => {
        setNavVisible((prev) => !prev);
    };

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
                aria-expanded={navVisible}
                onClick={toggleNav}
                style={{
                    backgroundImage: `url(${
                        navVisible ? closeIcon : hamburgerIcon
                    })`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    border: "none",
                    backgroundColor: "transparent",
                    width: "2rem",
                    aspectRatio: "1 / 1",
                    zIndex: 9999,
                }}
            >
                <span className="sr-only">Menu</span>
            </button>

            <nav className="nav-links" id="nav-links" data-visible={navVisible}>
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
                        <a href="/html/sign-up.html" id="nav-link-sign-up">
                            Sign Up
                        </a>
                    </li>
                    <li>
                        <a href="/html/log-in.html">Log In</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
