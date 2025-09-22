import React from "react";
import GridHeader from "../components/GridHeader";
import GridList from "../components/GridList";

// TODO: How to load in data not using parameters (so link isn't long)
// TODO: Load title of page into GridHeader
// TODO: Create a card for each movie in the list (inside grid-list)
// TODO: Create a grid card for both movies and shows (inside MediaCard)
// TODO: Button must load next set of movies (next page of the list it is loading)

const MediaGridPage = () => {
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
