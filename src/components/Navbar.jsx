import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import navbarLogo from "../assets/images/filmhead-nav-logo.svg";
import logo from "../assets/images/FilmHead-logo.png";
import hamburgerIcon from "../assets/images/icon-hamburger.svg";
import closeIcon from "../assets/images/icon-close.svg";

const Navbar = () => {
    const [navVisible, setNavVisible] = useState(false);
    const location = useLocation();

    const toggleNav = () => {
        setNavVisible((prev) => !prev);
    };

    const linkClass = ({ isActive }) => (isActive ? "current-page" : "");

    useEffect(() => {
        setNavVisible(false);
        window.scrollTo(0, 0);

        // Remove focus from any active element (like nav links)
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    }, [location.pathname]);

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
                        <NavLink to="movies" className={linkClass}>
                            Movies
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="details" className={linkClass}>
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
                    <li className="search-box-desktop">
                        <input
                            className="search-field"
                            type="search"
                            placeholder="Search..."
                        />
                    </li>
                    <li>
                        <Link to="sign-up" id="nav-link-sign-up">
                            Sign Up
                        </Link>
                    </li>
                    <li>
                        <NavLink to="log-in" className={linkClass}>
                            Log In
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
