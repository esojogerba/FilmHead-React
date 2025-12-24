import React, { useEffect, useState } from "react";
import { usePopup } from "../contexts/PopupContext";
import { useBacklog } from "../contexts/BacklogContext";
import { useToast } from "../contexts/ToastContext";

const CreateFolder = () => {
    const { activePopup, popupData, openPopup, closePopup } = usePopup();
    const { createFolder, validateFolderTitle } = useBacklog();
    const { showToast } = useToast();

    const [folderName, setFolderName] = useState("");
    const [emptyError, setEmptyError] = useState(false);
    const [duplicateError, setDuplicateError] = useState(false);

    const isVisible = activePopup === "createFolder";

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

    if (!isVisible) return null;

    // Helper: close this popup & reopen addToFolder if needed
    const closeAndReopenIfNeeded = () => {
        const fromAddToFolder = popupData?.from === "addToFolder";
        const originalAddData = popupData?.addToFolderData || null;

        closePopup();

        if (fromAddToFolder && originalAddData) {
            setTimeout(() => openPopup("addToFolder", originalAddData), 100);
        }
    };

    // Handle input typing
    const handleChange = (e) => {
        setFolderName(e.target.value);
        setEmptyError(false);
        setDuplicateError(false);
    };

    const handleClear = () => {
        setFolderName("");
        setEmptyError(false);
        setDuplicateError(false);
    };

    // Handle folder creation
    const handleCreateFolder = (e) => {
        e.preventDefault();

        const trimmedName = folderName.trim();

        // Prevent empty folder name
        if (!trimmedName) {
            setEmptyError(true);
            setDuplicateError(false);
            return;
        }

        // Validate duplicates
        const { valid, error } = validateFolderTitle(trimmedName);
        if (!valid && error === "Folder name already exists") {
            setDuplicateError(true);
            setEmptyError(false);
            return;
        }

        try {
            const newFolder = createFolder(trimmedName);
            console.log("Created folder:", newFolder);

            setFolderName("");
            setEmptyError(false);
            setDuplicateError(false);

            showToast("Folder created");

            closeAndReopenIfNeeded(); // ✅ close & reopen AddToFolder if needed
        } catch (err) {
            if (err.message.includes("empty")) setEmptyError(true);
            else if (err.message.includes("exists")) setDuplicateError(true);
        }
    };

    const handleClose = () => closeAndReopenIfNeeded();

    const isDisabled = !folderName.trim();

    return (
        <>
            <div
                className="pop-up-overlay second-overlay active"
                onClick={handleClose}
            ></div>

            <div className="create-folder active" aria-label="Create folder">
                <div className="create-folder-header">
                    <a
                        className="pop-up-close-btn"
                        onClick={handleClose}
                        aria-label="Close"
                    >
                        <svg
                            className="material-icon pop-up-close-icon"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.71 2.88 18.29 9.17 12 2.88 5.71 4.29 4.29 10.59 10.6 16.89 4.29z" />
                        </svg>
                    </a>
                    <svg className="material-icon" id="create-folder-svg">
                        <use
                            xlinkHref={`${
                                import.meta.env.BASE_URL
                            }assets/images/icons.svg#folder`}
                        />
                    </svg>
                    <h3 className="header-title">New folder</h3>
                </div>

                <div className="create-folder-body">
                    <h4
                        className={`folder-name-error ${
                            duplicateError ? "active" : ""
                        }`}
                    >
                        Folder name already exists
                    </h4>
                    <h4
                        id="empty-error"
                        className={`folder-name-error ${
                            emptyError ? "active" : ""
                        }`}
                    >
                        Invalid folder name
                    </h4>

                    <div className="create-folder-input-wrapper">
                        <input
                            className="create-folder-input"
                            type="text"
                            placeholder="Name"
                            autoComplete="off"
                            value={folderName}
                            onChange={handleChange}
                        />
                        {folderName && (
                            <button
                                type="button"
                                className="create-folder-input-clear"
                                onClick={handleClear}
                                aria-label="Clear folder name"
                            >
                                &times;
                            </button>
                        )}
                    </div>
                </div>

                <div className="create-folder-footer">
                    <a
                        className={`btn ${isDisabled ? "disabled" : ""}`}
                        onClick={!isDisabled ? handleCreateFolder : undefined}
                        style={{ pointerEvents: isDisabled ? "none" : "auto" }}
                    >
                        Done
                    </a>
                </div>
            </div>
        </>
    );
};

export default CreateFolder;
