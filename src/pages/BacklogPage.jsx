import React from "react";
import BacklogHeader from "../components/BacklogHeader";
import BacklogGrid from "../components/BacklogGrid";
import AddToFolder from "../components/AddToFolder";
import CreateFolder from "../components/CreateFolder";
import DeleteFolder from "../components/DeleteFolder";

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
            <DeleteFolder />
        </main>
    );
};

export default BacklogPage;
