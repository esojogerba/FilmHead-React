import React from "react";
import { usePopup } from "../contexts/PopupContext";

const DeleteFolderItem = () => {
    const { activePopup, openPopup, closePopup } = usePopup();

    if (activePopup !== "deleteItem") return null;

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
                    <h3 className="header-title">Remove from folder?</h3>
                </div>

                <p className="pop-up-body">
                    Are you sure you want to remove this entry from the folder?
                </p>

                <div className="confirm-cancel-btns">
                    <a className="btn" onClick={null}>
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

export default DeleteFolderItem;
