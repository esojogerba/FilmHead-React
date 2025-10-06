import React from "react";
import FolderHeader from "../components/FolderHeader";
import FolderGrid from "../components/FolderGrid";
import AddToFolder from "../components/AddToFolder";
import CreateFolder from "../components/CreateFolder";

const FolderPage = () => {
    return (
        <main>
            <article page-content="">
                <section className="container">
                    <FolderHeader />

                    <FolderGrid />
                </section>
            </article>

            <AddToFolder />
            <CreateFolder />
        </main>
    );
};

export default FolderPage;
