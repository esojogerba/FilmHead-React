import React from "react";
import closeIcon from "../assets/images/icon-close.svg";

const AddToFolder = () => {
    return (
        <>
            <div className="pop-up-overlay active"></div>

            <div className="add-to-folder active" aria-label="Add To Folder">
                <div className="add-to-folder-header">
                    <a className="pop-up-close-btn" onClick={null}>
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
                        onClick={null}
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

                <div className="add-to-folder-scroll">
                    <div className="add-to-folder-scroll-item">
                        <span>Folder</span>
                        <a className="add-to-folder-scroll-btn" href=""></a>
                    </div>
                    <div className="add-to-folder-scroll-item">
                        <span>Folder</span>
                        <a className="add-to-folder-scroll-btn" href=""></a>
                    </div>
                    <div className="add-to-folder-scroll-item">
                        <span>Folder</span>
                        <a className="add-to-folder-scroll-btn" href=""></a>
                    </div>
                    <div className="add-to-folder-scroll-item">
                        <span>Folder</span>
                        <a className="add-to-folder-scroll-btn" href=""></a>
                    </div>
                    <div className="add-to-folder-scroll-item">
                        <span>Folder</span>
                        <a className="add-to-folder-scroll-btn" href=""></a>
                    </div>
                    <div className="add-to-folder-scroll-item">
                        <span>Folder</span>
                        <a className="add-to-folder-scroll-btn" href=""></a>
                    </div>
                    <div className="add-to-folder-scroll-item">
                        <span>Folder</span>
                        <a className="add-to-folder-scroll-btn" href=""></a>
                    </div>
                    <div className="add-to-folder-scroll-item">
                        <span>Folder</span>
                        <a className="add-to-folder-scroll-btn" href=""></a>
                    </div>
                </div>

                <div className="add-to-folder-footer">
                    <a
                        className="btn btn-text-icon"
                        id="add-to-folder-btn"
                        onClick={null}
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
