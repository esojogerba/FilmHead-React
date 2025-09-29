import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useLocation } from "react-router-dom";
import { API_KEY } from "../utils/api";

const SearchContext = createContext(null);

const SEARCH_DELAY = 500;

export const SearchProvider = ({ children }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const debounceRef = useRef(null);
    const abortControllerRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
            debounceRef.current = null;
        }

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }

        setQuery("");
        setResults([]);
        setIsActive(false);
        setIsLoading(false);
    }, [location.key]);

    useEffect(() => {
        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
                debounceRef.current = null;
            }
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
                abortControllerRef.current = null;
            }
            setResults([]);
            setIsActive(false);
            setIsLoading(false);
            return;
        }

        setIsActive(true);
        setIsLoading(true);

        const controller = new AbortController();
        abortControllerRef.current = controller;

        debounceRef.current = setTimeout(async () => {
            try {
                if (controller.signal.aborted) {
                    return;
                }

                const url = new URL(
                    "https://api.themoviedb.org/3/search/multi"
                );
                url.searchParams.set("api_key", API_KEY);
                url.searchParams.set("query", trimmedQuery);
                url.searchParams.set("include_adult", "false");
                url.searchParams.set("language", "en-US");
                url.searchParams.set("page", "1");

                const response = await fetch(url.toString(), {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(
                        `Search request failed: ${response.status}`
                    );
                }

                const data = await response.json();
                const filteredResults = (data.results || []).filter(
                    (item) =>
                        item.media_type === "movie" || item.media_type === "tv"
                );

                if (!controller.signal.aborted) {
                    setResults(filteredResults);
                }
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Search request failed:", error);
                    setResults([]);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }, SEARCH_DELAY);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
                debounceRef.current = null;
            }
            controller.abort();
            abortControllerRef.current = null;
        };
    }, [query]);

    const handleSearchInput = (value) => {
        setQuery(value);
    };

    const clearSearch = () => {
        setQuery("");
    };

    const value = useMemo(
        () => ({
            query,
            results,
            isActive,
            isLoading,
            handleSearchInput,
            clearSearch,
        }),
        [query, results, isActive, isLoading]
    );

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);

    if (!context) {
        throw new Error("useSearch must be used within a SearchProvider");
    }

    return context;
};
