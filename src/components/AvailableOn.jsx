import React from "react";
import huluLogo from "../assets/images/hulu-logo.jpg";

const AvailableOn = ({ availableOn, imageBaseURL }) => {
    let inUS = false;
    let watchResults = [];

    if ("US" in availableOn) {
        inUS = true;
        watchResults = availableOn.US;
    } else {
        inUS = false;
    }

    return (
        <section className="media-scroll container">
            <div className="media-scroll-title-wrapper">
                <h3 className="media-scroll-title">Available On (US)</h3>
            </div>

            <div className="media-slider-list">
                <div className="slider-list-inner watch-col">
                    {inUS ? (
                        <>
                            {"flatrate" in watchResults ? (
                                <div className="watch-stream-col">
                                    <h4 className="watch-header">Stream</h4>
                                    <div className="watch-platforms-row">
                                        {watchResults.flatrate.map((entry) => (
                                            <img
                                                key={entry.provider_id}
                                                className="watch-logo"
                                                src={
                                                    imageBaseURL +
                                                    "w92" +
                                                    entry.logo_path
                                                }
                                                alt={entry.provider_name}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                            {"rent" in watchResults ? (
                                <div className="watch-rent-col">
                                    <h4 className="watch-header">Rent</h4>
                                    <div className="watch-platforms-row">
                                        {watchResults.rent.map((entry) => (
                                            <img
                                                key={entry.provider_id}
                                                className="watch-logo"
                                                src={
                                                    imageBaseURL +
                                                    "w92" +
                                                    entry.logo_path
                                                }
                                                alt={entry.provider_name}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                            {"buy" in watchResults ? (
                                <div className="watch-buy-col">
                                    <h4 className="watch-header">Buy</h4>
                                    <div className="watch-platforms-row">
                                        {watchResults.buy.map((entry) => (
                                            <img
                                                key={entry.provider_id}
                                                className="watch-logo"
                                                src={
                                                    imageBaseURL +
                                                    "w92" +
                                                    entry.logo_path
                                                }
                                                alt={entry.provider_name}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                        </>
                    ) : (
                        <h4 className="watch-header">Not Available in US</h4>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AvailableOn;
