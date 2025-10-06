import React from "react";
import { usePopup } from "../contexts/PopupContext";

const DeleteFolder = () => {
    const { activePopup, openPopup, closePopup } = usePopup();

    if (activePopup !== "deleteFolder") return null; // only show when active

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
                    <h3 className="header-title">Delete Folder?</h3>
                </div>

                <p className="pop-up-body">
                    Are you sure you want to permanently delete this folder?
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

export default DeleteFolder;
