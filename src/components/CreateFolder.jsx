import React from "react";
import closeIcon from "../assets/images/icon-close.svg";
import { usePopup } from "../contexts/PopupContext";

const CreateFolder = () => {
    const { activePopup, closePopup } = usePopup();

    if (activePopup !== "createFolder") return null;

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

                <h4 className="folder-name-error">
                    Folder name already exists
                </h4>

                <input
                    className="create-folder-input"
                    type="text"
                    placeholder="Name"
                    autoComplete="off"
                />

                <a className="btn" onClick={closePopup}>
                    Done
                </a>
            </div>
        </>
    );
};

export default CreateFolder;
