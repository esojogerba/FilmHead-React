import React from "react";
import searchIcon from "../assets/images/search-icon-white.svg";

const GridHeader = ({ title, type }) => {
    const mediaType = type + "s";
    return (
        <div className="grid-header">
            <img
                src={searchIcon}
                alt="Search"
                className="material-icon"
                id="grid-search-svg"
            />
            <h1 className="grid-title">
                {title} ·{" "}
                {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}
            </h1>
        </div>
    );
};

export default GridHeader;
