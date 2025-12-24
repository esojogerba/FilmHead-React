import React, { useEffect } from "react";
import { usePopup } from "../contexts/PopupContext";
import { useBacklog } from "../contexts/BacklogContext";
import { useToast } from "../contexts/ToastContext";

const DeleteFolder = () => {
    const { activePopup, popupData, closePopup } = usePopup();
    const { deleteFolder } = useBacklog();
    const { showToast } = useToast();

    const isVisible = activePopup === "deleteFolder" && Boolean(popupData);

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

            <div className="delete-folder active" aria-label="Delete folder">
                <div className="delete-folder-header">
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
                    <h3 className="header-title">Delete folder?</h3>
                </div>

                <div className="delete-folder-body">
                    <p className="pop-up-body">
                        Delete <strong>{popupData.title}</strong>? This can't be
                        undone.
                    </p>
                </div>

                <div className="delete-folder-footer">
                    <div className="confirm-cancel-btns">
                        <a
                            className="btn btn-destructive"
                            onClick={handleConfirmDelete}
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

export default DeleteFolder;
