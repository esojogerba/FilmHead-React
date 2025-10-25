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

    const [searchTerm, setSearchTerm] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);
    const [displayedItems, setDisplayedItems] = useState([]);

    // Load folder initially
    useEffect(() => {
        setLoading(true);
        const foundFolder = getFolderById(id);
        setFolder(foundFolder);
        setDisplayedItems(foundFolder?.items || []);
        setLoading(false);
    }, [id, getFolderById]);

    // Search/filter items
    useEffect(() => {
        if (!folder) return;

        if (!searchTerm) {
            setSearchLoading(false);
            setDisplayedItems(folder.items);
            return;
        }

        setSearchLoading(true);
        const delay = setTimeout(() => {
            const filtered = folder.items.filter((item) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setDisplayedItems(filtered);
            setSearchLoading(false);
        }, 300);

        return () => clearTimeout(delay);
    }, [searchTerm, folder]);

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
                    <FolderHeader
                        folderName={folder.title}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />

                    {displayedItems.length > 0 ? (
                        <FolderGrid
                            mediaList={displayedItems}
                            folderId={id}
                            loading={loading}
                            searchLoading={searchLoading}
                        />
                    ) : !searchLoading ? (
                        <p>No items found.</p>
                    ) : null}
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
