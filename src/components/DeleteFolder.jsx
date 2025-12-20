import React from "react";
import { usePopup } from "../contexts/PopupContext";
import { useBacklog } from "../contexts/BacklogContext";
import { useToast } from "../contexts/ToastContext";

const DeleteFolder = () => {
    const { activePopup, popupData, closePopup } = usePopup();
    const { deleteFolder } = useBacklog();
    const { showToast } = useToast();

    if (activePopup !== "deleteFolder" || !popupData) return null;

    const handleConfirmDelete = () => {
        try {
            deleteFolder(popupData.id);
            showToast(`Deleted "${popupData.title}"`);
            closePopup();
        } catch (err) {
            console.error("Failed to delete folder:", err);
            showToast("Failed to delete folder");
        }
    };

    return (
        <>
            <div className="pop-up-overlay active" onClick={closePopup}></div>

            <div className="delete-folder active">
                <div className="delete-folder-header">
                    <svg className="material-icon delete-svg">
                        <use
                            xlinkHref={`${
                                import.meta.env.BASE_URL
                            }assets/images/icons.svg#trash`}
                        />
                    </svg>
                    <h3 className="header-title">Delete folder?</h3>
                </div>

                <p className="pop-up-body">
                    Delete <strong>{popupData.title}</strong>? This can't be
                    undone.
                </p>

                <div className="confirm-cancel-btns">
                    <a className="btn" onClick={handleConfirmDelete}>
                        Confirm
                    </a>
                    <a className="btn" onClick={closePopup}>
                        Cancel
                    </a>
                </div>
            </div>
        </>
    );
};

export default DeleteFolder;
