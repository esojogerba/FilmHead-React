import React from "react";
import searchIcon from "../assets/images/search-icon-white.svg";

const GridHeader = () => {
    return (
        <div className="grid-header">
            <img
                src={searchIcon}
                alt="Search"
                className="material-icon"
                id="grid-search-svg"
            />
            <h1 className="grid-title">Science Fiction · Movies</h1>
        </div>
    );
};

export default GridHeader;
