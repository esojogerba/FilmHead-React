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

            <div className="delete-item active">
                <div className="delete-item-header">
                    <svg className="material-icon delete-svg">
                        <use
                            xlinkHref={`${
                                import.meta.env.BASE_URL
                            }assets/images/icons.svg#trash`}
                        />
                    </svg>
                    <h3 className="header-title">Remove item?</h3>
                </div>

                <p className="pop-up-body">
                    Remove this item from the folder?
                </p>

                <div className="confirm-cancel-btns">
                    <a className="btn btn-destructive" onClick={handleConfirm}>
                        Confirm
                    </a>
                    <a className="btn btn-secondary" onClick={closePopup}>
                        Cancel
                    </a>
                </div>
            </div>
        </>
    );
};

export default DeleteFolderItem;
