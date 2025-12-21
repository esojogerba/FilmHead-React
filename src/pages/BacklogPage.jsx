import React, { useEffect, useState } from "react";
import BacklogHeader from "../components/BacklogHeader";
import BacklogGrid from "../components/BacklogGrid";
import AddToFolder from "../components/AddToFolder";
import CreateFolder from "../components/CreateFolder";
import DeleteFolder from "../components/DeleteFolder";
import { useBacklog } from "../contexts/BacklogContext";
import LoadingOverlay from "../components/LoadingOverlay";

const BacklogPage = () => {
    const { getFolders } = useBacklog();
    const [folders, setFolders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);

    // Helper function: sort folders by most recently modified first
    const sortByLastModified = (list) =>
        [...list].sort(
            (a, b) =>
                new Date(b.lastModified).getTime() -
                new Date(a.lastModified).getTime()
        );

    // Load folders initially
    useEffect(() => {
        const loadFolders = async () => {
            setLoading(true);
            const allFolders = await getFolders();

            // sort by most recently modified by default
            const sorted = sortByLastModified(allFolders);
            setFolders(sorted);
            setLoading(false);
        };
        loadFolders();
    }, [getFolders]);

    // Handle search
    useEffect(() => {
        if (!searchTerm) {
            // restore default sort order when no search
            setSearchLoading(false);
            const allFolders = getFolders();
            const sorted = sortByLastModified(allFolders);
            setFolders(sorted);
            return;
        }

        setSearchLoading(true);
        const delay = setTimeout(() => {
            const allFolders = getFolders();
            const filtered = allFolders.filter((folder) =>
                folder.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            // no sorting applied here (keep current search order)
            setFolders(filtered);
            setSearchLoading(false);
        }, 300);

        return () => clearTimeout(delay);
    }, [searchTerm, getFolders]);

    // Reset search when leaving the page
    useEffect(() => {
        return () => {
            setSearchTerm("");
        };
    }, []);

    return (
        <main>
            {/* Full-page loading spinner (initial load only) */}
            {loading && <LoadingOverlay variant="page" />}

            <div className="page-motion">
                <article page-content="">
                    <section className="container">
                        <BacklogHeader
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />
                        <BacklogGrid
                            folders={folders}
                            loading={loading}
                            searchLoading={searchLoading}
                            searchTerm={searchTerm}
                        />
                    </section>
                </article>
            </div>

            <AddToFolder />
            <CreateFolder />
            <DeleteFolder />
        </main>
    );
};

export default BacklogPage;
