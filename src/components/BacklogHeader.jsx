import React from "react";
import { usePopup } from "../contexts/PopupContext";

const BacklogHeader = ({ searchTerm, setSearchTerm }) => {
    const { openPopup } = usePopup();

    return (
        <>
            <div className="backlog-header">
                <svg className="material-icon" id="backlog-svg">
                    <use
                        xlinkHref={`${
                            import.meta.env.BASE_URL
                        }assets/images/icons.svg#backlog`}
                    />
                </svg>
                <h1 id="backlog-title">Backlog</h1>
            </div>

            <div className="backlog-menu">
                <input
                    className="backlog-search-field"
                    type="search"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <a
                    className="btn-icon"
                    onClick={() => openPopup("createFolder")}
                    id="backlog-add-btn"
                >
                    <svg className="material-icon" id="add-svg">
                        <use
                            xlinkHref={`${
                                import.meta.env.BASE_URL
                            }assets/images/icons.svg#add-icon`}
                        />
                    </svg>
                </a>
            </div>
        </>
    );
};

export default BacklogHeader;
