import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import dropdownArrow from "../assets/images/dropdown-arrow.png";
import DropdownGenreLink from "./DropdownGenreLink";

// TODO: make links work with routing

const MediaPageHeader = ({ title, genres, type }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <section className="media-page-header">
            <h1 className="media-page-title">{title}</h1>
            <div className="genre-dropdown" ref={dropdownRef}>
                <button onClick={toggleDropdown} className="dropdown-btn">
                    <span>Genres</span>
                    <img src={dropdownArrow} alt="Dropdown Arrow" />
                </button>
                <div
                    id="movies-dropdown"
                    className={`dropdown-menu ${isOpen ? "show-dropdown" : ""}`}
                >
                    {Object.entries(genres)
                        .filter(([key]) => key !== "asString")
                        .map(([id, name]) => (
                            <DropdownGenreLink
                                key={id}
                                id={id}
                                name={name}
                                type={type}
                            />
                        ))}
                </div>
            </div>
        </section>
    );
};

export default MediaPageHeader;
