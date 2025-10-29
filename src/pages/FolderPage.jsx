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
    const [filterLoading, setFilterLoading] = useState(false);

    const [displayedItems, setDisplayedItems] = useState([]);

    // Load folder initially
    useEffect(() => {
        setLoading(true);
        const foundFolder = getFolderById(id);
        setFolder(foundFolder);
        setDisplayedItems(foundFolder?.items || []);
        setLoading(false);
    }, [id, getFolderById]);

    // Search/filter items (search)
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

    // Listen for filter application event from Filter.jsx
    useEffect(() => {
        const handler = (e) => {
            const { movieGenres, showGenres, providers, sortBy } =
                e.detail || {};
            if (!folder) return;

            setFilterLoading(true);

            let result = folder.items.slice();

            const hasMovieFilters = movieGenres?.length > 0;
            const hasShowFilters = showGenres?.length > 0;
            const hasProviderFilters = providers?.length > 0;

            // If no filters are selected at all -> just restore default
            if (!hasMovieFilters && !hasShowFilters && !hasProviderFilters) {
                result.sort(
                    (a, b) => new Date(a.addedAt) - new Date(b.addedAt)
                ); // default order oldest → newest
            } else {
                result = result.filter((item) => {
                    const type = item.mediaType;

                    let match = true;

                    // --- Movie genre filters ---
                    if (hasMovieFilters) {
                        if (type === "movie") {
                            match = movieGenres.some((g) =>
                                item.genres?.includes(g)
                            );
                        } else {
                            // if movie filters exist but item is NOT a movie, it's excluded
                            return false;
                        }
                    }

                    // --- Show genre filters ---
                    if (hasShowFilters) {
                        const isShow = type === "tv" || type === "show";
                        if (isShow) {
                            match =
                                match &&
                                showGenres.some((g) =>
                                    item.genres?.includes(g)
                                );
                        } else {
                            // if show filters exist but item is not a show, exclude
                            return false;
                        }
                    }

                    // --- Provider filters ---
                    if (hasProviderFilters) {
                        match =
                            match &&
                            providers.some((p) =>
                                item.providers?.some(
                                    (ip) => ip.toLowerCase() === p.toLowerCase()
                                )
                            );
                    }

                    return match;
                });
            }

            // Sort logic (same as before)
            if (sortBy) {
                if (sortBy === "name-asc") {
                    result.sort((a, b) =>
                        (a.title || "").localeCompare(
                            b.title || "",
                            undefined,
                            { sensitivity: "base" }
                        )
                    );
                } else if (sortBy === "name-desc") {
                    result.sort((a, b) =>
                        (b.title || "").localeCompare(
                            a.title || "",
                            undefined,
                            { sensitivity: "base" }
                        )
                    );
                } else if (sortBy === "date-desc") {
                    result.sort(
                        (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
                    );
                } else if (sortBy === "date-asc") {
                    result.sort(
                        (a, b) => new Date(a.addedAt) - new Date(b.addedAt)
                    );
                }
            }

            setDisplayedItems(result);
            setFilterLoading(false);
        };

        window.addEventListener("folderFiltersApplied", handler);
        return () =>
            window.removeEventListener("folderFiltersApplied", handler);
    }, [folder]);

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
                            filterLoading={filterLoading}
                        />
                    ) : !searchLoading && !filterLoading ? (
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
