import React from "react";
import { Link } from "react-router-dom";
import { imageBaseURL } from "../utils/api";
import { usePopup } from "../contexts/PopupContext";
import posterPlaceholder from "../assets/images/Blade Runner Poster.png";

const Folder = ({ folder }) => {
    const { openPopup } = usePopup();

    const posters = folder.posters || [];

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        openPopup("deleteFolder", { id: folder.id, title: folder.title });
    };

    return (
        <div className="folder">
            <div className="folder-posters">
                {[0, 1, 2].map((i) => {
                    const posterPath = posters[i];
                    const hasPoster = posterPath && posterPath !== "";
                    const src = hasPoster
                        ? imageBaseURL + "w342" + posterPath
                        : "";
                    return (
                        <figure className="poster-box folder-poster" key={i}>
                            <img
                                src={src}
                                alt={folder.title}
                                className="img-cover"
                                loading="lazy"
                                style={{
                                    display: hasPoster ? "block" : "none",
                                }}
                            />
                            {!hasPoster && (
                                <img
                                    src={posterPlaceholder}
                                    alt="Empty"
                                    className="img-cover"
                                    loading="lazy"
                                    style={{ display: "none" }}
                                />
                            )}
                        </figure>
                    );
                })}
            </div>

            <div className="folder-details">
                <h3 className="folder-title">{folder.title}</h3>
                <p className="folder-entry-count">
                    {folder.count} {folder.count === 1 ? "Entry" : "Entries"}
                </p>
            </div>

            <a
                className="btn-icon"
                onClick={handleDeleteClick}
                id="backlog-trash-btn"
            >
                <svg className="material-icon" id="trash-svg">
                    <use
                        xlinkHref={`${
                            import.meta.env.BASE_URL
                        }assets/images/icons.svg#trash`}
                    />
                </svg>
            </a>

            <Link
                className="folder-btn"
                title={folder.title}
                to={`/folder/${folder.id}`}
            ></Link>
        </div>
    );
};

export default Folder;
