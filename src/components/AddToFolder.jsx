import React, { useEffect, useState } from "react";
import closeIcon from "../assets/images/icon-close.svg";
import { usePopup } from "../contexts/PopupContext";
import { useBacklog } from "../contexts/BacklogContext";

const AddToFolder = () => {
    const { activePopup, openPopup, closePopup } = usePopup();
    const { getFolders } = useBacklog();
    const [folders, setFolders] = useState([]);

    // Load folders each time popup opens
    useEffect(() => {
        if (activePopup === "addToFolder") {
            const allFolders = getFolders();
            setFolders(allFolders);
        }
    }, [activePopup, getFolders]);

    if (activePopup !== "addToFolder") return null; // only show when active

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

                    <input
                        className="add-to-folder-search"
                        type="search"
                        placeholder="Search..."
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

                {/* Scrollable Folder List */}
                <div className="add-to-folder-scroll">
                    {folders.length > 0 ? (
                        folders.map((folder) => (
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
                    ) : (
                        <div className="add-to-folder-scroll-item">
                            <span>No folders created yet</span>
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
