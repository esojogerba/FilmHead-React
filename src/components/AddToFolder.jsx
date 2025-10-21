import React, { useEffect, useState } from "react";
import closeIcon from "../assets/images/icon-close.svg";
import { usePopup } from "../contexts/PopupContext";
import { useBacklog } from "../contexts/BacklogContext";
import LoadingOverlay from "./LoadingOverlay"; // reuse section overlay

const AddToFolder = () => {
    const { activePopup, openPopup, closePopup } = usePopup();
    const { getFolders } = useBacklog();

    const [folders, setFolders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);

    // Helper: sort folders by most recently modified
    const sortByLastModified = (list) =>
        [...list].sort(
            (a, b) =>
                new Date(b.lastModified).getTime() -
                new Date(a.lastModified).getTime()
        );

    // Load folders when popup opens
    useEffect(() => {
        if (activePopup === "addToFolder") {
            const allFolders = getFolders();
            const sorted = sortByLastModified(allFolders);
            setFolders(sorted);
            setSearchTerm(""); // reset search when popup opens
        }
    }, [activePopup, getFolders]);

    // Handle search filtering
    useEffect(() => {
        if (activePopup !== "addToFolder") return;

        if (!searchTerm) {
            // show default sort order when search cleared
            const allFolders = getFolders();
            const sorted = sortByLastModified(allFolders);
            setFolders(sorted);
            setSearchLoading(false);
            return;
        }

        setSearchLoading(true);
        const delay = setTimeout(() => {
            const allFolders = getFolders();
            const filtered = allFolders.filter((folder) =>
                folder.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFolders(filtered);
            setSearchLoading(false);
        }, 300);

        return () => clearTimeout(delay);
    }, [searchTerm, activePopup, getFolders]);

    // Clear search when popup closes
    useEffect(() => {
        if (activePopup !== "addToFolder") {
            setSearchTerm("");
            setSearchLoading(false);
        }
    }, [activePopup]);

    if (activePopup !== "addToFolder") return null;

    return (
        <>
            <div className="pop-up-overlay active" onClick={closePopup}></div>

            <div className="add-to-folder active" aria-label="Add To Folder">
                <div className="add-to-folder-header">
                    <a className="pop-up-close-btn" onClick={closePopup}>
                        <img
                            id="pop-up-close-img"
                            src={closeIcon}
                            alt="Close"
                        />
                    </a>

                    <h3 className="header-title">Save To Folder</h3>

                    {/* Controlled search input */}
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
                            openPopup("createFolder", { from: "addToFolder" })
                        }
                    >
                        <svg className="material-icon" id="add-to-folder-svg">
                            <use
                                xlinkHref={`${
                                    import.meta.env.BASE_URL
                                }assets/images/icons.svg#add-icon`}
                            />
                        </svg>
                        <span>New Folder</span>
                    </a>
                </div>

                {/* Folder list with section overlay */}
                <div
                    className="add-to-folder-scroll"
                    style={{ position: "relative" }}
                >
                    {searchLoading && <LoadingOverlay variant="section" />}

                    {folders.length > 0
                        ? folders.map((folder) => (
                              <div
                                  key={folder.id}
                                  className="add-to-folder-scroll-item"
                              >
                                  <span>{folder.title}</span>
                                  <a
                                      className="add-to-folder-scroll-btn"
                                      href="#"
                                      onClick={(e) => e.preventDefault()}
                                  ></a>
                              </div>
                          ))
                        : !searchLoading && (
                              <div className="add-to-folder-scroll-item">
                                  <span>No folders found</span>
                              </div>
                          )}
                </div>

                <div className="add-to-folder-footer">
                    <a
                        className="btn btn-text-icon"
                        id="add-to-folder-btn"
                        onClick={closePopup}
                    >
                        <svg className="material-icon" id="add-to-folder-svg">
                            <use
                                xlinkHref={`${
                                    import.meta.env.BASE_URL
                                }assets/images/icons.svg#add-icon`}
                            />
                        </svg>
                        <span>Add</span>
                    </a>
                </div>
            </div>
        </>
    );
};

export default AddToFolder;
