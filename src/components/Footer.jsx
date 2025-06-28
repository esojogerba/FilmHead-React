import React from "react";
import footerLogo from "../assets/images/filmhead-footer-logo.svg";
import tmdLogo from "../assets/images/tmdb-logo.svg";

// TODO: add routing to footer logo back to homepage

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-flex">
                    <div className="footer-logo">
                        <a href="index.html">
                            <img
                                src={footerLogo}
                                alt="FilmHead footer logo"
                                height="50px"
                            />
                        </a>
                    </div>
                    <div className="footer-github">
                        <a
                            href="https://github.com/esojogerba/FilmHead-React"
                            id="github-link"
                        >
                            <svg
                                className="material-icon"
                                id="github-icon-svg"
                                height="30px"
                            >
                                <use xlinkHref="./assets/images/icons.svg#github-logo" />
                            </svg>
                        </a>
                        <p>© 2023 FilmHead. All rights reserved.</p>
                    </div>
                    <div className="footer-tmdb">
                        <p>Powered by</p>
                        <a href="https://www.themoviedb.org/">
                            <img
                                src={tmdLogo}
                                alt="The Movie Database logo"
                                height="20px"
                            />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom" />
        </footer>
    );
};

export default Footer;
