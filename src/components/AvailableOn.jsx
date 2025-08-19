import React from "react";
import huluLogo from "../assets/images/hulu-logo.jpg";

const AvailableOn = () => {
    return (
        <section className="media-scroll container">
            <div className="media-scroll-title-wrapper">
                <h3 className="media-scroll-title">Available On (US)</h3>
            </div>
            <div className="media-slider-list">
                <div className="slider-list-inner watch-col">
                    <div className="watch-stream-col">
                        <h4 className="watch-header">Stream</h4>
                        <div className="watch-platforms-row">
                            <img
                                className="watch-logo"
                                src={huluLogo}
                                alt="Hulu"
                            />
                            <img
                                className="watch-logo"
                                src={huluLogo}
                                alt="Hulu"
                            />
                            <img
                                className="watch-logo"
                                src={huluLogo}
                                alt="Hulu"
                            />
                        </div>
                    </div>
                    <div className="watch-rent-col">
                        <h4 className="watch-header">Rent</h4>
                        <div className="watch-platforms-row">
                            <img
                                className="watch-logo"
                                src={huluLogo}
                                alt="Hulu"
                            />
                            <img
                                className="watch-logo"
                                src={huluLogo}
                                alt="Hulu"
                            />
                            <img
                                className="watch-logo"
                                src={huluLogo}
                                alt="Hulu"
                            />
                        </div>
                    </div>
                    <div className="watch-buy-col">
                        <h4 className="watch-header">Buy</h4>
                        <div className="watch-platforms-row">
                            <img
                                className="watch-logo"
                                src={huluLogo}
                                alt="Hulu"
                            />
                            <img
                                className="watch-logo"
                                src={huluLogo}
                                alt="Hulu"
                            />
                            <img
                                className="watch-logo"
                                src={huluLogo}
                                alt="Hulu"
                            />
                        </div>
                    </div>
                    <h4 className="watch-header">Not Available in US</h4>
                </div>
            </div>
        </section>
    );
};

export default AvailableOn;
