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
import { API_KEY } from "../utils/api";

const FolderPage = () => {
    const { id } = useParams();
    const { getFolderById, updateFolder } = useBacklog();

    const [folder, setFolder] = useState(null);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);
    const [filterLoading, setFilterLoading] = useState(false);
    const [displayedItems, setDisplayedItems] = useState([]);

    // Check if more than 7 days since last update
    const shouldUpdateProviders = (folder) => {
        if (!folder?.lastProviderUpdate) return true;
        const last = new Date(folder.lastProviderUpdate);
        const now = new Date();
        const diffDays = (now - last) / (1000 * 60 * 60 * 24);
        return diffDays >= 7;
    };

    // Update watch providers for all items (background, no overlay)
    const refreshProviders = async (folderData) => {
        try {
            const updatedItems = await Promise.all(
                folderData.items.map(async (item) => {
                    try {
                        const url =
                            item.mediaType === "movie"
                                ? `https://api.themoviedb.org/3/movie/${item.apiId}/watch/providers?api_key=${API_KEY}`
                                : `https://api.themoviedb.org/3/tv/${item.apiId}/watch/providers?api_key=${API_KEY}`;

                        const res = await fetch(url);
                        const data = await res.json();

                        const usProviders = data.results?.US || {};
                        const providerNames = [
                            ...(usProviders.flatrate?.map(
                                (p) => p.provider_name
                            ) || []),
                            ...(usProviders.rent?.map((p) => p.provider_name) ||
                                []),
                            ...(usProviders.buy?.map((p) => p.provider_name) ||
                                []),
                        ];

                        return { ...item, providers: providerNames };
                    } catch (err) {
                        console.error(
                            `Provider update failed for ${item.title}:`,
                            err
                        );
                        return item;
                    }
                })
            );

            const updatedFolder = {
                ...folderData,
                items: updatedItems,
                lastProviderUpdate: new Date().toISOString(),
            };

            updateFolder(updatedFolder); // persist updated folder
            setFolder(updatedFolder);
            setDisplayedItems(updatedFolder.items);
        } catch (err) {
            console.error("Error updating providers:", err);
        }
    };

    // Load folder initially
    useEffect(() => {
        setLoading(true);
        const foundFolder = getFolderById(id);
        if (foundFolder) {
            setFolder(foundFolder);
            setDisplayedItems(foundFolder.items || []);

            // Run refresh silently in the background
            if (shouldUpdateProviders(foundFolder)) {
                refreshProviders(foundFolder); // no loading state shown
            }
        }
        setLoading(false);
    }, [id, getFolderById]);

    // Search logic
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

    // Filter logic
    useEffect(() => {
        const handler = (e) => {
            const { movieGenres, showGenres, providers, sortBy } =
                e.detail || {};
            if (!folder) return;

            setFilterLoading(true);

            const items = folder.items || [];

            const hasMovieFilters = movieGenres?.length > 0;
            const hasShowFilters = showGenres?.length > 0;
            const hasProviderFilters = providers?.length > 0;

            const filteredMovies = items.filter((item) => {
                if (item.mediaType !== "movie") return false;

                let match = true;

                if (hasMovieFilters) {
                    match =
                        match &&
                        movieGenres.some((g) => item.genres?.includes(g));
                }

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

            const filteredShows = items.filter((item) => {
                const isShow =
                    item.mediaType === "tv" || item.mediaType === "show";
                if (!isShow) return false;

                let match = true;

                if (hasShowFilters) {
                    match =
                        match &&
                        showGenres.some((g) => item.genres?.includes(g));
                }

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

            let result = [...filteredMovies, ...filteredShows];

            if (!hasMovieFilters && !hasShowFilters && !hasProviderFilters) {
                result = [...items].sort(
                    (a, b) => new Date(a.addedAt) - new Date(b.addedAt)
                );
            }

            if (sortBy) {
                if (sortBy === "name-asc") {
                    result.sort((a, b) =>
                        (a.title || "").localeCompare(
                            b.title || "",
                            undefined,
                            {
                                sensitivity: "base",
                            }
                        )
                    );
                } else if (sortBy === "name-desc") {
                    result.sort((a, b) =>
                        (b.title || "").localeCompare(
                            a.title || "",
                            undefined,
                            {
                                sensitivity: "base",
                            }
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
