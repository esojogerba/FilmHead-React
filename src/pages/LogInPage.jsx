import React, { useState, useEffect } from "react";
import screening from "../assets/images/screening.svg";
import bgCircle1 from "../assets/images/bg-circle-1.png";
import bgCircle2 from "../assets/images/bg-circle-2.png";
import LoadingOverlay from "../components/LoadingOverlay";

const LogInPage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const images = document.querySelectorAll("img");
        let loadedCount = 0;

        if (images.length === 0) {
            setLoading(false);
            return;
        }

        const handleImageLoad = () => {
            loadedCount++;
            if (loadedCount === images.length) {
                setLoading(false);
            }
        };

        images.forEach((img) => {
            if (img.complete) {
                handleImageLoad();
            } else {
                img.addEventListener("load", handleImageLoad);
                img.addEventListener("error", handleImageLoad);
            }
        });

        return () => {
            images.forEach((img) => {
                img.removeEventListener("load", handleImageLoad);
                img.removeEventListener("error", handleImageLoad);
            });
        };
    }, []);

    return (
        <main className="mobile-bg-img | padding-bottom-900-mobile">
            {loading && <LoadingOverlay />}
            <div className="page-motion">
                <section className="account-page text-center-sm-only margin-bottom-500">
                    <div className="container account-form-bg-circles">
                        <div className="account-form-columns">
                            <div className="account-form-col-left">
                                <div className="account-form div-center-sm-only">
                                    <h1 className="account-form-header">
                                        Log in
                                    </h1>
                                    <form
                                        action=""
                                        className="sign-up-form div-center-sm-only"
                                    >
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                autoComplete="off"
                                                required
                                            />
                                            <label htmlFor="username">
                                                Username
                                            </label>
                                        </div>
                                        <div className="input-group">
                                            <input
                                                type="password"
                                                id="pw"
                                                name="pw"
                                                autoComplete="off"
                                                required
                                            />
                                            <label htmlFor="pw">Password</label>
                                        </div>
                                    </form>
                                    <button className="btn account-form-btn">
                                        Continue
                                    </button>
                                </div>
                            </div>
                            <div className="account-form-col-right">
                                <img
                                    src={screening}
                                    alt="screening"
                                    className="form-image"
                                    loading="eager"
                                />
                            </div>
                        </div>
                        <img
                            className="account-form-bg-circle-top"
                            src={bgCircle1}
                            alt="background decorative circle"
                        />
                        <img
                            className="account-form-bg-circle-bottom"
                            src={bgCircle2}
                            alt="background decorative circle"
                        />
                    </div>
                </section>
            </div>
        </main>
    );
};

export default LogInPage;
