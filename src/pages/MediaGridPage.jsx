import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GridHeader from "../components/GridHeader";
import GridList from "../components/GridList";

// TODO: Load title of page into GridHeader
// TODO: Create a card for each movie in the list (inside grid-list)
// TODO: Create a grid card for both movies and shows (inside MediaCard)
// TODO: Button must load next set of movies (next page of the list it is loading)

const MediaGridPage = () => {
    const location = useLocation();
    const [config, setConfig] = useState(() => {
        // Try from location.state first, fallback to localStorage
        return (
            location.state ||
            JSON.parse(localStorage.getItem("mediaGridConfig"))
        );
    });

    useEffect(() => {
        if (location.state) {
            // If we navigated here with state, update localStorage too
            localStorage.setItem(
                "mediaGridConfig",
                JSON.stringify(location.state)
            );
            setConfig(location.state);
        }
    }, [location.state]);

    if (!config) {
        return <p>No data found for this grid.</p>;
    }

    console.log(config);

    return (
        <main>
            <article page-content="">
                <section className="media-grid container">
                    <GridHeader />

                    <GridList />
                </section>
            </article>
        </main>
    );
};

export default MediaGridPage;
