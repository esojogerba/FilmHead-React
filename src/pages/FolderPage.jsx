import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBacklog } from "../contexts/BacklogContext";
import LoadingOverlay from "../components/LoadingOverlay";
import FolderHeader from "../components/FolderHeader";
import FolderGrid from "../components/FolderGrid";
import AddToFolder from "../components/AddToFolder";
import CreateFolder from "../components/CreateFolder";
import DeleteFolderItem from "../components/DeleteFolderItem";
import Filter from "../components/Filter";

const FolderPage = () => {
    const { id } = useParams();
    const { getFolderById } = useBacklog();
    const [folder, setFolder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const foundFolder = getFolderById(id);
        setFolder(foundFolder);
        setLoading(false);
    }, [id, getFolderById]);

    if (loading) return <LoadingOverlay variant="page" />;

    if (!folder) {
        return (
            <main>
                <section className="container">
                    <h2>Folder not found</h2>
                </section>
            </main>
        );
    }

    return (
        <main>
            <article page-content="">
                <section className="container">
                    <FolderHeader folderName={folder.title} />

                    {folder.items.length > 0 ? (
                        <FolderGrid mediaList={folder.items} />
                    ) : (
                        <p>No items in this folder yet.</p>
                    )}
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
