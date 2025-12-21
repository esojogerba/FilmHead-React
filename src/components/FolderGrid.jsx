import React from "react";
import MediaCard from "../components/MediaCard";

const ICON_SPRITE_PATH = `${import.meta.env.BASE_URL}assets/images/icons.svg`;

const FolderGrid = ({
    mediaList,
    folderId,
    loading,
    searchLoading,
    filterLoading,
    searchTerm,
}) => {
    const isLoading = loading || searchLoading || filterLoading;
    const hasSearchTerm = searchTerm?.trim().length > 0;

    if (isLoading) {
        return (
            <div className="grid-list folder-grid skeleton-grid">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div
                        key={`folder-item-skeleton-${index}`}
                        className="grid-card skeleton-card"
                    >
                        <div className="skeleton-poster"></div>
                        <div className="skeleton-line skeleton-line-md"></div>
                        <div className="skeleton-line skeleton-line-sm"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (!mediaList || mediaList.length === 0) {
        return !isLoading ? (
            <div className="empty-state">
                <svg className="empty-state__icon" aria-hidden="true">
                    <use xlinkHref={`${ICON_SPRITE_PATH}#folder`} />
                </svg>
                <p className="empty-state__text">
                    {hasSearchTerm ? "No items found." : "No items yet."}
                </p>
            </div>
        ) : null;
    }

    return (
        <div className="grid-list folder-grid" style={{ position: "relative" }}>
            {mediaList.map((item) => (
                <MediaCard
                    key={item.folderItemId}
                    mediaData={{
                        id: item.apiId,
                        title: item.title,
                        name: item.title,
                        poster_path: item.posterPath,
                        release_date: item.year?.toString() || "",
                        first_air_date: item.year?.toString() || "",
                    }}
                    type={`folder-${item.mediaType}`}
                    folderId={folderId}
                />
            ))}
        </div>
    );
};

export default FolderGrid;
