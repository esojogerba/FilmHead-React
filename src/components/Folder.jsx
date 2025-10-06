import React from "react";
import { Link } from "react-router-dom";
import { usePopup } from "../contexts/PopupContext";
import posterImg from "../assets/images/Blade Runner Poster.png";

const Folder = () => {
    const { activePopup, openPopup, closePopup } = usePopup();

    return (
        <div className="folder">
            <div className="folder-posters">
                <figure className="poster-box folder-poster">
                    <img
                        src={posterImg}
                        alt="Blade Runner"
                        className="img-cover"
                        loading="lazy"
                    />
                </figure>
                <figure className="poster-box folder-poster">
                    <img
                        src={posterImg}
                        alt="Blade Runner"
                        className="img-cover"
                        loading="lazy"
                    />
                </figure>
                <figure className="poster-box folder-poster">
                    <img
                        src={posterImg}
                        alt="Blade Runner"
                        className="img-cover"
                        loading="lazy"
                    />
                </figure>
            </div>
            <div className="folder-details">
                <h3 className="folder-title">Folder Name</h3>
                <p className="folder-entry-count">15 Entries</p>
            </div>
            <a
                className="btn-icon"
                onClick={() => openPopup("deleteFolder")}
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
                title="Folder Name"
                to={`/folder/${"001"}`}
                onClick={() => null}
            ></Link>
        </div>
    );
};

export default Folder;
