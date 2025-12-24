import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import navbarLogo from "../assets/images/filmhead-nav-logo.svg";
import logo from "../assets/images/FilmHead-logo.png";
import { useSearch } from "../contexts/SearchContext";

const Navbar = () => {
    const [navVisible, setNavVisible] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const mobileSearchRef = useRef(null);
    const navRef = useRef(null);
    const navToggleRef = useRef(null);
    const location = useLocation();
    const { query, handleSearchInput, clearSearch } = useSearch();
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

    useEffect(() => {
        if (!navVisible) return undefined;

        const handleOutsideClick = (event) => {
            const target = event.target;
            if (
                navRef.current?.contains(target) ||
                navToggleRef.current?.contains(target)
            ) {
                return;
            }
            setNavVisible(false);
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("touchstart", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("touchstart", handleOutsideClick);
        };
    }, [navVisible]);

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
                        type="text"
                        placeholder="Find movies & shows..."
                        value={query}
                        onChange={(event) =>
                            handleSearchInput(event.target.value)
                        }
                        aria-label="Search"
                    />
                    {query && (
                        <button
                            type="button"
                            className="nav-search-clear"
                            onClick={clearSearch}
                            aria-label="Clear search"
                        >
                            &times;
                        </button>
                    )}
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
                ref={navToggleRef}
            >
                <svg className="mobile-nav-icon" viewBox="0 0 24 24">
                    {navVisible ? (
                        <g transform="translate(2, 0)">
                            <path d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.71 2.88 18.29 9.17 12 2.88 5.71 4.29 4.29 10.59 10.6 16.89 4.29z" />
                        </g>
                    ) : (
                        <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
                    )}
                </svg>
                <span className="sr-only">Menu</span>
            </button>

            <nav
                className="nav-links"
                id="nav-links"
                data-visible={navVisible}
                ref={navRef}
            >
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
                                type="text"
                                placeholder="Find movies & shows..."
                                value={query}
                                onChange={(event) =>
                                    handleSearchInput(event.target.value)
                                }
                                aria-label="Search"
                            />
                            {query && (
                                <button
                                    type="button"
                                    className="nav-search-clear"
                                    onClick={clearSearch}
                                    aria-label="Clear search"
                                >
                                    &times;
                                </button>
                            )}
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
