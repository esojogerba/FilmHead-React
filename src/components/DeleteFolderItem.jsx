import React from "react";
import { usePopup } from "../contexts/PopupContext";
import { useBacklog } from "../contexts/BacklogContext";
import { useToast } from "../contexts/ToastContext";

const DeleteFolderItem = () => {
    const { activePopup, popupData, closePopup } = usePopup();
    const { removeItemFromFolder } = useBacklog();
    const { showToast } = useToast();

    if (activePopup !== "deleteItem" || !popupData) return null;

    const handleConfirm = () => {
        const { folderId, itemId } = popupData;

        try {
            if (folderId && itemId) {
                removeItemFromFolder(folderId, itemId);
                showToast("Item deleted");
            } else {
                showToast("Failed to delete item");
            }
        } catch (err) {
            console.error("Failed to delete item:", err);
            showToast("Error deleting item");
        } finally {
            closePopup();
        }
    };

    return (
        <>
            <div className="pop-up-overlay active" onClick={closePopup}></div>

            <div className="delete-item active" aria-label="Remove item">
                <div className="delete-item-header">
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
                            <path d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.71 2.88 18.29 9.17 12 2.88 5.71 4.29 4.29 10.59 10.6 16.89 4.29z" />
                        </svg>
                    </a>
                    <svg className="material-icon delete-svg">
                        <use
                            xlinkHref={`${
                                import.meta.env.BASE_URL
                            }assets/images/icons.svg#trash`}
                        />
                    </svg>
                    <h3 className="header-title">Remove item?</h3>
                </div>

                <div className="delete-item-body">
                    <p className="pop-up-body">
                        Remove this item from the folder?
                    </p>
                </div>

                <div className="delete-item-footer">
                    <div className="confirm-cancel-btns">
                        <a
                            className="btn btn-destructive"
                            onClick={handleConfirm}
                        >
                            Confirm
                        </a>
                        <a className="btn btn-secondary" onClick={closePopup}>
                            Cancel
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteFolderItem;
