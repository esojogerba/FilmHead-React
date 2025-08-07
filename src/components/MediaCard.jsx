import React from "react";
import { imageBaseURL, API_KEY, fetchDataFromAPI } from "../utils/api";

// TODO: implement movie details link route
// TODO: make cards for shows, grid-movie, and grid-tv
// TODO: implement the add btn

const MediaCard = ({ mediaData, type, genres }) => {
    if (type === "movie") {
        return (
            <div className="media-card">
                <figure className="poster-box card-poster">
                    <img
                        src={
                            mediaData.poster_path != null
                                ? imageBaseURL + "w342" + mediaData.poster_path
                                : "#"
                        }
                        alt={mediaData.title}
                        className="img-cover"
                        loading="lazy"
                        onError={(e) => (e.target.style.display = "none")}
                    />
                    <a href="" className="media-card-add-btn">
                        <svg className="material-icon" id="card-add-svg">
                            <use xlinkHref="./assets/images/icons.svg#add-icon" />
                        </svg>
                    </a>
                </figure>
                <h4 className="media-card-title">{mediaData.title}</h4>
                <div className="meta-list media-card-meta">
                    <div className="meta-list">
                        <div className="meta-item">
                            {mediaData.release_date.split("-")[0]}
                        </div>
                    </div>
                </div>
                <p className="media-card-genres">
                    {genres?.asString?.(mediaData.genre_ids) || ""}
                </p>
                <a href="" className="card-btn" title="" onclick="" />
            </div>
        );
    } else {
        return (
            <div className="media-card">
                <figure className="poster-box card-poster">
                    <img
                        src="#"
                        alt=""
                        className="img-cover"
                        loading="lazy"
                        onError={(e) => (e.target.style.display = "none")}
                    />
                    <a href="" className="media-card-add-btn">
                        <svg className="material-icon" id="card-add-svg">
                            <use xlinkHref="./assets/images/icons.svg#add-icon" />
                        </svg>
                    </a>
                </figure>
                <h4 className="media-card-title"></h4>
                <div className="meta-list media-card-meta">
                    <div className="meta-list">
                        <div className="meta-item"></div>
                        <div className="meta-item"></div>
                    </div>
                    <div className="card-badge"></div>
                </div>
                <p className="media-card-genres"></p>
                <a href="" className="card-btn" title="" onclick="" />
            </div>
        );
    }
};

export default MediaCard;
