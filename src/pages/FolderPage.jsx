import React from "react";
import FolderHeader from "../components/FolderHeader";
import FolderGrid from "../components/FolderGrid";

const FolderPage = () => {
    return (
        <main>
            <article page-content="">
                <section className="container">
                    <FolderHeader />

                    <FolderGrid />
                </section>
            </article>
        </main>
    );
};

export default FolderPage;
