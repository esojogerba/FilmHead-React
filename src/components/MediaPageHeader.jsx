import React from "react";
import dropdownArrow from "../assets/images/dropdown-arrow.png";

// TODO: make it reusable, pass in title and genre list
// TODO: implement drop down
// TODO: make links work with routing

const MediaPageHeader = () => {
    return (
        <section className="media-page-header">
            <h1 className="media-page-title">Movies</h1>
            <div className="genre-dropdown">
                <button onclick="toggleDropdown()" className="dropdown-btn">
                    <span>Genres</span>
                    <img src={dropdownArrow} />
                </button>
                <div id="movies-dropdown" className="dropdown-menu">
                    <a href="#">Science Fiction</a>
                    <a href="#">Genre 2</a>
                    <a href="#">Genre 3</a>
                    <a href="#">Genre 3</a>
                    <a href="#">Genre 3</a>
                    <a href="#">Genre 3</a>
                    <a href="#">Genre 3</a>
                </div>
            </div>
        </section>
    );
};

export default MediaPageHeader;
