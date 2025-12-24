import React, { useEffect, useState } from "react";
import { usePopup } from "../contexts/PopupContext";
import { useBacklog } from "../contexts/BacklogContext";
import { useToast } from "../contexts/ToastContext";
import LoadingOverlay from "./LoadingOverlay";
import { API_KEY } from "../utils/api";

const ICON_SPRITE_PATH = `${import.meta.env.BASE_URL}assets/images/icons.svg`;

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
            setSearchLoading(false);
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

    useEffect(() => {
        if (!isVisible) return undefined;

        const scrollY = window.scrollY;
        const body = document.body;
        const html = document.documentElement;
        const hadBodyNoScroll = body.classList.contains("no-scroll");
        const hadHtmlNoScroll = html.classList.contains("no-scroll");
        const previousStyles = {
            position: body.style.position,
            top: body.style.top,
            left: body.style.left,
            right: body.style.right,
            width: body.style.width,
            overflowY: body.style.overflowY,
        };

        body.classList.add("no-scroll");
        html.classList.add("no-scroll");

        body.style.position = "fixed";
        body.style.top = `-${scrollY}px`;
        body.style.left = "0";
        body.style.right = "0";
        body.style.width = "100%";
        body.style.overflowY = "scroll";

        return () => {
            if (!hadBodyNoScroll) {
                body.classList.remove("no-scroll");
            }
            if (!hadHtmlNoScroll) {
                html.classList.remove("no-scroll");
            }

            body.style.position = previousStyles.position;
            body.style.top = previousStyles.top;
            body.style.left = previousStyles.left;
            body.style.right = previousStyles.right;
            body.style.width = previousStyles.width;
            body.style.overflowY = previousStyles.overflowY;

            window.scrollTo(0, scrollY);
        };
    }, [isVisible]);

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
                                aria-label="Close"
                            >
                                <svg
                                    className="material-icon pop-up-close-icon"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <g transform="translate(1, 0)">
                                        <path d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.71 2.88 18.29 9.17 12 2.88 5.71 4.29 4.29 10.59 10.6 16.89 4.29z" />
                                    </g>
                                </svg>
                            </a>

                            <h3 className="header-title">Save to folder</h3>

                            <div className="add-to-folder-search-wrapper">
                                <input
                                    className="add-to-folder-search"
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                                {searchTerm && (
                                    <button
                                        type="button"
                                        className="add-to-folder-search-clear"
                                        onClick={() => setSearchTerm("")}
                                        aria-label="Clear search"
                                    >
                                        &times;
                                    </button>
                                )}
                            </div>

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

                            <div className="add-to-folder-scroll-content">
                                {folders.length > 0 ? (
                                    folders.map((folder) => {
                                        const isSelected =
                                            selectedFolders.includes(folder.id);
                                        return (
                                            <div
                                                key={folder.id}
                                                className={`add-to-folder-scroll-item ${
                                                    isSelected ? "selected" : ""
                                                }`}
                                                role="button"
                                                tabIndex={0}
                                                aria-pressed={isSelected}
                                                onClick={() =>
                                                    toggleFolderSelection(
                                                        folder.id
                                                    )
                                                }
                                                onKeyDown={(event) => {
                                                    if (
                                                        event.key === "Enter" ||
                                                        event.key === " "
                                                    ) {
                                                        event.preventDefault();
                                                        toggleFolderSelection(
                                                            folder.id
                                                        );
                                                    }
                                                }}
                                            >
                                                <span>{folder.title}</span>
                                                <a
                                                    className="add-to-folder-scroll-btn"
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        toggleFolderSelection(
                                                            folder.id
                                                        );
                                                    }}
                                                ></a>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="add-to-folder-empty">
                                        <svg
                                            className="empty-state__icon"
                                            aria-hidden="true"
                                        >
                                            <use
                                                xlinkHref={`${ICON_SPRITE_PATH}#folder`}
                                            />
                                        </svg>
                                        <span className="empty-state__text">
                                            No folders found.
                                        </span>
                                    </div>
                                )}
                            </div>
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
