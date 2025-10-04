import React from "react";
import BacklogHeader from "../components/BacklogHeader";
import BacklogGrid from "../components/BacklogGrid";
import AddToFolder from "../components/AddToFolder";
import CreateFolder from "../components/CreateFolder";

const BacklogPage = () => {
    return (
        <main>
            <article page-content="">
                <section className="container">
                    <BacklogHeader />

                    <BacklogGrid />
                </section>
            </article>

            <AddToFolder />
            <CreateFolder />
        </main>
    );
};

export default BacklogPage;
