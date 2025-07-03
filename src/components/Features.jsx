import React from "react";
import bgCircle1 from "../assets/images/bg-circle-1.png";
import bgCircle2 from "../assets/images/bg-circle-2.png";

const Features = () => {
    return (
        <div className="container home-bg-circles">
            <section className="features">
                <div className="features-columns">
                    <div className="features-left-col">
                        <h2 className="features-title">Organize</h2>
                        <h2 className="features-title">&amp; Conquer</h2>
                    </div>
                    <div className="features-right-col">
                        <div className="features-row">
                            <div className="features-card">
                                <div className="features-card-icon">
                                    <svg
                                        className="material-icon"
                                        id="movies&shows-svg"
                                    >
                                        <use xlinkHref="./assets/images/icons.svg#shows" />
                                    </svg>
                                </div>
                                <h3 className="features-card-title">
                                    Movies &amp; Shows
                                </h3>
                                <p className="features-card-body">
                                    Browse and stockpile thousands of your
                                    favorite movies and tv shows.
                                </p>
                            </div>
                            <div className="features-card">
                                <div className="features-card-icon">
                                    <svg
                                        className="material-icon"
                                        id="folders-svg"
                                    >
                                        <use xlinkHref="./assets/images/icons.svg#folders" />
                                    </svg>
                                </div>
                                <h3 className="features-card-title">Folders</h3>
                                <p className="features-card-body">
                                    Create unlimited folders to organize and
                                    categorize your backlog.
                                </p>
                            </div>
                        </div>
                        <div className="features-row">
                            <div className="features-card">
                                <div className="features-card-icon">
                                    <svg
                                        className="material-icon"
                                        id="store-svg"
                                    >
                                        <use xlinkHref="./assets/images/icons.svg#store" />
                                    </svg>
                                </div>
                                <h3 className="features-card-title">Store</h3>
                                <p className="features-card-body">
                                    Store all of your folders in your account
                                    for quick and easy access.
                                </p>
                            </div>
                            <div className="features-card">
                                <div className="features-card-icon">
                                    <svg
                                        className="material-icon"
                                        id="watch-svg"
                                    >
                                        <use xlinkHref="./assets/images/icons.svg#watch" />
                                    </svg>
                                </div>
                                <h3 className="features-card-title">Watch</h3>
                                <p className="features-card-body">
                                    View streaming availability and start
                                    conquering your backlog today.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <img
                className="home-bg-circle-top"
                src={bgCircle1}
                alt="background decorative circle"
            />
            <img
                className="home-bg-circle-bottom"
                src={bgCircle2}
                alt="background decorative circle"
            />
        </div>
    );
};

export default Features;
