import React, { useState, useEffect } from "react";
import { usePopup } from "../contexts/PopupContext";
import closeIcon from "../assets/images/icon-close.svg";
import dropdownArrow from "../assets/images/dropdown-arrow.png";

const Filter = () => {
    const { activePopup, closePopup } = usePopup();
    const [openDropdowns, setOpenDropdowns] = useState({});

    // Reset dropdowns when the popup opens or closes
    useEffect(() => {
        if (activePopup !== "filter") {
            setOpenDropdowns({});
        }
    }, [activePopup]);

    if (activePopup !== "filter") return null;

    const toggleDropdown = (name) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    return (
        <>
            <div className="pop-up-overlay active" onClick={closePopup}></div>

            <div className="filter-pop-up active">
                {/* Header */}
                <div className="filter-header">
                    <a className="pop-up-close-btn" onClick={closePopup}>
                        <img
                            id="pop-up-close-img"
                            src={closeIcon}
                            alt="close"
                        />
                    </a>
                    <svg className="material-icon" id="filter-pop-up-svg">
                        <use
                            xlinkHref={`${
                                import.meta.env.BASE_URL
                            }assets/images/icons.svg#filter`}
                        />
                    </svg>
                    <h3 className="header-title">Sort & Filter</h3>
                </div>

                {/* SORT BY */}
                <a
                    onClick={() => toggleDropdown("sort-by")}
                    className="filter-dropdown-btn"
                    id="sort-by"
                >
                    <span>Sort By</span>
                    <img src={dropdownArrow} alt="toggle" />
                </a>
                <div
                    className={`sort-by-dropdown ${
                        openDropdowns["sort-by"] ? "active" : ""
                    }`}
                >
                    <div className="sort-by-scroll-item">
                        <a className="add-to-folder-scroll-btn" href="#"></a>
                        <span>Name (A to Z)</span>
                    </div>
                    <div className="sort-by-scroll-item">
                        <a className="add-to-folder-scroll-btn" href="#"></a>
                        <span>Name (Z to A)</span>
                    </div>
                    <div className="sort-by-scroll-item">
                        <a className="add-to-folder-scroll-btn" href="#"></a>
                        <span>Date Added (New to Old)</span>
                    </div>
                    <div className="sort-by-scroll-item">
                        <a className="add-to-folder-scroll-btn" href="#"></a>
                        <span>Date Added (Old to New)</span>
                    </div>
                </div>

                {/* FILTER BY */}
                <a
                    onClick={() => toggleDropdown("filter-by")}
                    className="filter-dropdown-btn"
                    id="filter-by"
                >
                    <span>Filter By</span>
                    <img src={dropdownArrow} alt="toggle" />
                </a>
                <div
                    className={`filter-by-dropdown ${
                        openDropdowns["filter-by"] ? "active" : ""
                    }`}
                >
                    {/* MOVIE GENRES */}
                    <a
                        onClick={() => toggleDropdown("filter-movie-genres")}
                        className="filter-dropdown-btn"
                        id="filter-movie-genres"
                    >
                        <span>Movie Genres</span>
                        <img src={dropdownArrow} alt="toggle" />
                    </a>
                    <div
                        className={`movie-genres-scroll ${
                            openDropdowns["filter-movie-genres"] ? "active" : ""
                        }`}
                    >
                        {["Adventure", "Fantasy", "Animation", "Drama"].map(
                            (g) => (
                                <div className="filter-by-scroll-item" key={g}>
                                    <a
                                        className="add-to-folder-scroll-btn"
                                        href="#"
                                    ></a>
                                    <span>{g}</span>
                                </div>
                            )
                        )}
                    </div>

                    {/* SHOW GENRES */}
                    <a
                        onClick={() => toggleDropdown("filter-show-genres")}
                        className="filter-dropdown-btn"
                        id="filter-show-genres"
                    >
                        <span>Show Genres</span>
                        <img src={dropdownArrow} alt="toggle" />
                    </a>
                    <div
                        className={`show-genres-scroll ${
                            openDropdowns["filter-show-genres"] ? "active" : ""
                        }`}
                    >
                        {["Adventure", "Fantasy", "Animation", "Drama"].map(
                            (g) => (
                                <div className="filter-by-scroll-item" key={g}>
                                    <a
                                        className="add-to-folder-scroll-btn"
                                        href="#"
                                    ></a>
                                    <span>{g}</span>
                                </div>
                            )
                        )}
                    </div>

                    {/* STREAMING PLATFORMS */}
                    <a
                        onClick={() => toggleDropdown("filter-streaming")}
                        className="filter-dropdown-btn"
                        id="filter-streaming"
                    >
                        <span>Streaming Platforms</span>
                        <img src={dropdownArrow} alt="toggle" />
                    </a>
                    <div
                        className={`streaming-scroll ${
                            openDropdowns["filter-streaming"] ? "active" : ""
                        }`}
                    >
                        {["Netflix", "Hulu", "Max", "Tubi"].map((s) => (
                            <div className="filter-by-scroll-item" key={s}>
                                <a
                                    className="add-to-folder-scroll-btn"
                                    href="#"
                                ></a>
                                <span>{s}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <a className="btn" onClick={closePopup}>
                    Done
                </a>
            </div>
        </>
    );
};

export default Filter;
