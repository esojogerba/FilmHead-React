import React from "react";
import BacklogHeader from "../components/BacklogHeader";
import BacklogGrid from "../components/BacklogGrid";

const BacklogPage = () => {
    return (
        <main>
            <article page-content="">
                <section className="container">
                    <BacklogHeader />

                    <BacklogGrid />
                </section>
            </article>
        </main>
    );
};

export default BacklogPage;
