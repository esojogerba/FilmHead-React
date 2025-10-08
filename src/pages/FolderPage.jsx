import React from "react";
import FolderHeader from "../components/FolderHeader";
import FolderGrid from "../components/FolderGrid";
import AddToFolder from "../components/AddToFolder";
import CreateFolder from "../components/CreateFolder";
import DeleteFolderItem from "../components/DeleteFolderItem";
import Filter from "../components/Filter";

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
            <DeleteFolderItem />
            <Filter />
        </main>
    );
};

export default FolderPage;
