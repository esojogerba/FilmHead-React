import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import navbarLogo from "../assets/images/filmhead-nav-logo.svg";
import logo from "../assets/images/FilmHead-logo.png";
import hamburgerIcon from "../assets/images/icon-hamburger.svg";
import closeIcon from "../assets/images/icon-close.svg";
import { useSearch } from "../contexts/SearchContext";

const Navbar = () => {
    const [navVisible, setNavVisible] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const mobileSearchRef = useRef(null);
    const location = useLocation();
    const { query, handleSearchInput } = useSearch();
    const searchIconPath = `${
        import.meta.env.BASE_URL
    }assets/images/icons.svg#search-icon`;

    const toggleNav = () => {
        setNavVisible((prev) => !prev);
    };

    const toggleMobileSearch = () => {
        setIsMobileSearchOpen((prev) => !prev);
    };

    const linkClass = ({ isActive }) => (isActive ? "current-page" : "");

    useEffect(() => {
        setNavVisible(false);
        setIsMobileSearchOpen(false);
        window.scrollTo(0, 0);

        // Remove focus from any active element (like nav links)
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    }, [location.pathname]);

    useEffect(() => {
        if (isMobileSearchOpen && mobileSearchRef.current) {
            mobileSearchRef.current.focus();
        }
    }, [isMobileSearchOpen]);

    return (
        <header className="container primary-header">
            <div>
                <Link to="" className="desktop-nav-logo">
                    <img
                        src={navbarLogo}
                        alt="FilmHead logo"
                        id="nav-logo-img"
                    />
                </Link>
            </div>

            <div>
                <Link to="" className="mobile-nav-logo">
                    <img src={logo} alt="FilmHead logo" id="nav-logo-img" />
                </Link>
            </div>

            <div
                className={`nav-search-mobile${
                    isMobileSearchOpen ? " is-open" : ""
                }`}
            >
                <div className="nav-search">
                    <svg className="nav-search-icon" aria-hidden="true">
                        <use xlinkHref={searchIconPath} />
                    </svg>
                    <input
                        ref={mobileSearchRef}
                        className="nav-search-input"
                        type="search"
                        placeholder="Find movies & shows..."
                        value={query}
                        onChange={(event) =>
                            handleSearchInput(event.target.value)
                        }
                        aria-label="Search"
                    />
                </div>
                <button
                    className="nav-search-toggle"
                    type="button"
                    aria-label="Toggle search"
                    aria-expanded={isMobileSearchOpen}
                    onClick={toggleMobileSearch}
                >
                    <svg className="nav-search-icon" aria-hidden="true">
                        <use xlinkHref={searchIconPath} />
                    </svg>
                </button>
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
                        <NavLink to="movies" className={linkClass}>
                            Movies
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="shows" className={linkClass}>
                            Shows
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="backlog" className={linkClass}>
                            Backlog
                        </NavLink>
                    </li>
                </ul>
                <ul role="list" className="nav-links-right">
                    <li className="nav-search-desktop">
                        <div className="nav-search">
                            <svg className="nav-search-icon" aria-hidden="true">
                                <use xlinkHref={searchIconPath} />
                            </svg>
                            <input
                                className="nav-search-input"
                                type="search"
                                placeholder="Find movies & shows"
                                value={query}
                                onChange={(event) =>
                                    handleSearchInput(event.target.value)
                                }
                                aria-label="Search"
                            />
                        </div>
                    </li>
                    <li>
                        <Link to="sign-up" id="nav-link-sign-up">
                            Sign up
                        </Link>
                    </li>
                    <li>
                        <NavLink to="log-in" className={linkClass}>
                            Log in
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
