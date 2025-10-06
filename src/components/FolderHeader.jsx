import React from "react";

const FolderHeader = () => {
    return (
        <>
            <div className="backlog-header">
                <svg className="material-icon" id="backlog-svg">
                    <use
                        xlinkHref={`${
                            import.meta.env.BASE_URL
                        }assets/images/icons.svg#folder`}
                    />
                </svg>
                <h1 className="folder-title">Creature Feature</h1>
            </div>

            <div className="backlog-menu">
                <input
                    className="backlog-search-field"
                    type="search"
                    placeholder="Search..."
                />

                <a className="btn-icon" onClick={null} id="backlog-add-btn">
                    <svg className="material-icon" id="add-svg">
                        <use
                            xlinkHref={`${
                                import.meta.env.BASE_URL
                            }assets/images/icons.svg#filter`}
                        />
                    </svg>
                </a>
            </div>
        </>
    );
};

export default FolderHeader;
