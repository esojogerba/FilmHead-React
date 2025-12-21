import React from "react";
import MediaCard from "./MediaCard";
import { useSearch } from "../contexts/SearchContext";

const ICON_SPRITE_PATH = `${
    import.meta.env.BASE_URL
}assets/images/icons.svg#search-icon`;

const SearchOverlay = () => {
    const { isActive, isLoading, query, results } = useSearch();
    const trimmedQuery = query.trim();

    if (!isActive && !isLoading) {
        return null;
    }

    return (
        <div className={`search-modal${isActive ? " active" : ""}`}>
            <section className="media-grid container">
                <div className="grid-header">
                    <svg className="material-icon" id="grid-search-svg">
                        <use xlinkHref={ICON_SPRITE_PATH} />
                    </svg>
                    <h1 className="grid-title">{trimmedQuery}</h1>
                </div>

                <div
                    className={`grid-list ${isLoading ? "skeleton-grid" : ""}`}
                >
                    {isLoading && results.length === 0
                        ? Array.from({ length: 12 }).map((_, index) => (
                              <div
                                  key={`search-skeleton-${index}`}
                                  className="grid-card skeleton-card"
                              >
                                  <div className="skeleton-poster"></div>
                                  <div className="skeleton-line skeleton-line-md"></div>
                                  <div className="skeleton-line skeleton-line-sm"></div>
                              </div>
                          ))
                        : results.map((item) => {
                              const mediaType =
                                  item.media_type === "tv"
                                      ? "show"
                                      : item.media_type;

                              return (
                                  <MediaCard
                                      key={`${item.media_type}-${item.id}`}
                                      mediaData={item}
                                      type={`grid-${mediaType}`}
                                  />
                              );
                          })}
                </div>

                {!isLoading && trimmedQuery && results.length === 0 && (
                    <p className="grid-empty">No results.</p>
                )}
            </section>
        </div>
    );
};

export default SearchOverlay;
