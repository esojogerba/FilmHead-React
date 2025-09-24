import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const DropdownGenreLink = ({ id, name, type }) => {
    const navigate = useNavigate();

    // Navigate to MediaGridPage
    const handleGenreClick = (e) => {
        e.preventDefault();

        const urlParam = `with_genres=${id}`;

        const config = {
            title: name,
            mediaType: type,
            listType: "genre",
            urlParam,
        };

        localStorage.setItem("mediaGridConfig", JSON.stringify(config));

        navigate(`/${type + "s"}/gridlist/${name}`, { state: config });
    };

    return (
        <a key={id} href="" onClick={(e) => handleGenreClick(e)}>
            {name}
        </a>
    );
};

export default DropdownGenreLink;
