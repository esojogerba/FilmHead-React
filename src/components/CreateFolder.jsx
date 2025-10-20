import React, { useState } from "react";
import closeIcon from "../assets/images/icon-close.svg";
import { usePopup } from "../contexts/PopupContext";
import { useBacklog } from "../contexts/BacklogContext";
import { useToast } from "../contexts/ToastContext";

const CreateFolder = () => {
    const { activePopup, closePopup } = usePopup();
    const { createFolder, validateFolderTitle } = useBacklog();
    const { showToast } = useToast();

    const [folderName, setFolderName] = useState("");
    const [emptyError, setEmptyError] = useState(false);
    const [duplicateError, setDuplicateError] = useState(false);

    if (activePopup !== "createFolder") return null;

    // Handle input typing
    const handleChange = (e) => {
        setFolderName(e.target.value);
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
            return; // don't close popup
        }

        // Validate duplicates using the context
        const { valid, error } = validateFolderTitle(trimmedName);
        if (!valid && error === "Folder name already exists") {
            setDuplicateError(true);
            setEmptyError(false);
            return; // don't close popup
        }

        try {
            // Create the folder
            const newFolder = createFolder(trimmedName);
            console.log("Created folder:", newFolder);

            // Clear input and errors before closing
            setFolderName("");
            setEmptyError(false);
            setDuplicateError(false);

            closePopup();
            showToast("New Folder Created");
        } catch (err) {
            // Defensive fallback (shouldn't normally happen)
            if (err.message.includes("empty")) setEmptyError(true);
            else if (err.message.includes("exists")) setDuplicateError(true);
        }
    };

    // Disable button when empty
    const isDisabled = !folderName.trim();

    return (
        <>
            <div
                className="pop-up-overlay second-overlay active"
                onClick={closePopup}
            ></div>

            <div className="create-folder active">
                <div className="create-folder-header">
                    <a className="pop-up-close-btn" onClick={closePopup}>
                        <img
                            id="pop-up-close-img"
                            src={closeIcon}
                            alt="Close"
                        />
                    </a>
                    <svg className="material-icon" id="create-folder-svg">
                        <use
                            xlinkHref={`${
                                import.meta.env.BASE_URL
                            }assets/images/icons.svg#folder`}
                        />
                    </svg>
                    <h3 className="header-title">Create Folder</h3>
                </div>

                {/* --- ERROR MESSAGES --- */}
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

                {/* --- INPUT FIELD --- */}
                <input
                    className="create-folder-input"
                    type="text"
                    placeholder="Name"
                    autoComplete="off"
                    value={folderName}
                    onChange={handleChange}
                />

                {/* --- DONE BUTTON --- */}
                <a
                    className={`btn ${isDisabled ? "disabled" : ""}`}
                    onClick={!isDisabled ? handleCreateFolder : undefined}
                    style={{ pointerEvents: isDisabled ? "none" : "auto" }}
                >
                    Done
                </a>
            </div>
        </>
    );
};

export default CreateFolder;
