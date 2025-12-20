import React, { useEffect, useState } from "react";
import closeIcon from "../assets/images/icon-close.svg";
import { usePopup } from "../contexts/PopupContext";
import { useBacklog } from "../contexts/BacklogContext";
import { useToast } from "../contexts/ToastContext";
import LoadingOverlay from "./LoadingOverlay";
import { API_KEY } from "../utils/api";

const AddToFolder = () => {
    const { activePopup, popupData, openPopup, closePopup } = usePopup();
    const { getFolders, addItemsToFolders } = useBacklog();

    const [folders, setFolders] = useState([]);
    const [selectedFolders, setSelectedFolders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);
    const [loadingProviders, setLoadingProviders] = useState(false);

    const { showToast } = useToast();

    // Load folders each time popup opens
    useEffect(() => {
        if (activePopup === "addToFolder") {
            const allFolders = [...getFolders()].sort(
                (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
            );
            setFolders(allFolders);
            setSelectedFolders([]);
            setSearchTerm("");
        }
    }, [activePopup, getFolders]);

    // Handle folder selection toggle
    const toggleFolderSelection = (folderId) => {
        setSelectedFolders((prev) =>
            prev.includes(folderId)
                ? prev.filter((id) => id !== folderId)
                : [...prev, folderId]
        );
    };

    // Handle Add click (fetch providers, then add)
    const handleAdd = async () => {
        if (!popupData || selectedFolders.length === 0) return;

        setLoadingProviders(true);
        try {
            const { apiId, mediaType } = popupData;
            const providersUrl =
                mediaType === "movie"
                    ? `https://api.themoviedb.org/3/movie/${apiId}/watch/providers?api_key=${API_KEY}`
                    : `https://api.themoviedb.org/3/tv/${apiId}/watch/providers?api_key=${API_KEY}`;

            const response = await fetch(providersUrl);
            const data = await response.json();

            const usProviders = data.results?.US || {};
            const providerNames = [
                ...(usProviders.flatrate?.map((p) => p.provider_name) || []),
                ...(usProviders.rent?.map((p) => p.provider_name) || []),
                ...(usProviders.buy?.map((p) => p.provider_name) || []),
            ];

            const itemData = {
                ...popupData,
                providers: providerNames,
            };

            const { added, skipped } = addItemsToFolders(
                itemData,
                selectedFolders
            );

            if (added > 0) {
                showToast("Item added");
            } else {
                showToast("Item already exists in selected folders");
            }
        } catch (err) {
            console.error("Failed to fetch watch providers:", err);
        } finally {
            setLoadingProviders(false);
            closePopup();
        }
    };

    // Search folders (client-side)
    useEffect(() => {
        if (!searchTerm) {
            const sorted = [...getFolders()].sort(
                (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
            );
            setFolders(sorted);
            return;
        }

        setSearchLoading(true);
        const delay = setTimeout(() => {
            const allFolders = getFolders();
            const filtered = allFolders.filter((f) =>
                f.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFolders(filtered);
            setSearchLoading(false);
        }, 250);

        return () => clearTimeout(delay);
    }, [searchTerm, getFolders]);

    /* Render nothing visually if popup not active,
       but still call hooks safely */
    const isVisible = activePopup === "addToFolder";

    return (
        <>
            {isVisible && (
                <>
                    <div
                        className="pop-up-overlay active"
                        onClick={closePopup}
                    ></div>

                    <div
                        className="add-to-folder active"
                        aria-label="Save to folder"
                    >
                        <div className="add-to-folder-header">
                            <a
                                className="pop-up-close-btn"
                                onClick={closePopup}
                            >
                                <img
                                    id="pop-up-close-img"
                                    src={closeIcon}
                                    alt="Close"
                                />
                            </a>

                            <h3 className="header-title">Save to folder</h3>

                            <input
                                className="add-to-folder-search"
                                type="search"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

                            <a
                                className="btn btn-text-icon"
                                id="add-new-folder-btn"
                                onClick={() =>
                                    openPopup("createFolder", {
                                        from: "addToFolder",
                                        addToFolderData: popupData,
                                    })
                                }
                            >
                                <svg
                                    className="material-icon"
                                    id="add-to-folder-svg"
                                >
                                    <use
                                        xlinkHref={`${
                                            import.meta.env.BASE_URL
                                        }assets/images/icons.svg#add-icon`}
                                    />
                                </svg>
                                <span>New folder</span>
                            </a>
                        </div>

                        {/* Scrollable Folder List */}
                        <div
                            className="add-to-folder-scroll"
                            style={{ position: "relative" }}
                        >
                            {(searchLoading || loadingProviders) && (
                                <LoadingOverlay variant="section" />
                            )}

                            {folders.length > 0 ? (
                                folders.map((folder) => {
                                    const isSelected = selectedFolders.includes(
                                        folder.id
                                    );
                                    return (
                                        <div
                                            key={folder.id}
                                            className={`add-to-folder-scroll-item ${
                                                isSelected ? "selected" : ""
                                            }`}
                                            style={{
                                                backgroundColor: isSelected
                                                    ? "var(--clr-primary)"
                                                    : "transparent",
                                            }}
                                        >
                                            <span>{folder.title}</span>
                                            <a
                                                className="add-to-folder-scroll-btn"
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    toggleFolderSelection(
                                                        folder.id
                                                    );
                                                }}
                                                style={{
                                                    backgroundColor: isSelected
                                                        ? "var(--clr-white-900)"
                                                        : "transparent",
                                                }}
                                            ></a>
                                        </div>
                                    );
                                })
                            ) : (
                                <span className="add-to-folder-empty">
                                    No folders yet.
                                </span>
                            )}
                        </div>

                        <div className="add-to-folder-footer">
                            <a
                                className={`btn btn-text-icon ${
                                    selectedFolders.length === 0
                                        ? "disabled"
                                        : ""
                                }`}
                                id="add-to-folder-btn"
                                onClick={
                                    selectedFolders.length > 0
                                        ? handleAdd
                                        : undefined
                                }
                                style={{
                                    pointerEvents:
                                        selectedFolders.length === 0
                                            ? "none"
                                            : "auto",
                                }}
                            >
                                <svg
                                    className="material-icon"
                                    id="add-to-folder-svg"
                                >
                                    <use
                                        xlinkHref={`${
                                            import.meta.env.BASE_URL
                                        }assets/images/icons.svg#add-icon`}
                                    />
                                </svg>
                                <span>Save</span>
                            </a>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default AddToFolder;
