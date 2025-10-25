import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

/**
 * Backlog context — supports folders and media items.
 *
 * Folder shape:
 * {
 *   id: string,
 *   title: string,
 *   createdAt: ISOString,
 *   items: MediaItem[],
 *   count: number,
 *   lastModified: ISOString,
 * }
 *
 * MediaItem shape:
 * {
 *   folderItemId: string,
 *   apiId: string | number,
 *   mediaType: "movie" | "show",
 *   title: string,
 *   posterPath: string | null,
 *   year: string | number,
 *   addedAt: ISOString,
 *   genres: string[],
 *   providers: string[],
 *   watched: boolean
 * }
 */

const STORAGE_KEY = "filmhead.backlog";
const defaultBacklog = { folders: [] };

const BacklogContext = createContext(null);

/* --- Helpers --- */

const generateId = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return `id-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
};

// For individual media items inside folders
const generateItemId = () => `item-${generateId()}`;

// Clean up folder structure for stability
const sanitizeFolder = (raw = {}) => {
    const id = raw.id || generateId();
    const title = typeof raw.title === "string" ? raw.title : "Untitled";
    const createdAt = raw.createdAt || new Date().toISOString();
    const items = Array.isArray(raw.items) ? raw.items : [];
    const count = items.length;
    const lastModified = raw.lastModified || createdAt;

    return {
        id,
        title,
        createdAt,
        items,
        count,
        lastModified,
    };
};

/* --- Persistence --- */

const loadBacklog = () => {
    if (typeof window === "undefined") return defaultBacklog;

    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored) return defaultBacklog;

        const parsed = JSON.parse(stored);
        if (
            !parsed ||
            typeof parsed !== "object" ||
            !Array.isArray(parsed.folders)
        ) {
            return defaultBacklog;
        }

        return {
            folders: parsed.folders
                .filter((f) => f && typeof f === "object")
                .map(sanitizeFolder),
        };
    } catch (err) {
        console.warn("Failed to parse backlog from localStorage", err);
        return defaultBacklog;
    }
};

const persistBacklog = (backlog) => {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(backlog));
    } catch (err) {
        console.warn("Failed to persist backlog", err);
    }
};

/* --- Provider --- */

export const BacklogProvider = ({ children }) => {
    const [backlog, setBacklog] = useState(() => loadBacklog());

    useEffect(() => {
        persistBacklog(backlog);
    }, [backlog]);

    /* ------------------ Folder Functions ------------------ */

    const validateFolderTitle = useCallback(
        (title) => {
            const trimmed = (title || "").trim();
            if (!trimmed) {
                return { valid: false, error: "Folder name cannot be empty" };
            }
            const exists = backlog.folders.some(
                (f) => f.title?.trim().toLowerCase() === trimmed.toLowerCase()
            );
            if (exists) {
                return { valid: false, error: "Folder name already exists" };
            }
            return { valid: true, error: null };
        },
        [backlog.folders]
    );

    const createFolder = useCallback((title) => {
        const trimmed = (title || "").trim();
        if (!trimmed) throw new Error("Folder name cannot be empty");

        let duplicate = false;
        let createdFolder = null;

        setBacklog((prev) => {
            const exists = prev.folders.some(
                (folder) =>
                    folder.title?.trim().toLowerCase() === trimmed.toLowerCase()
            );
            if (exists) {
                duplicate = true;
                return prev;
            }

            createdFolder = {
                id: generateId(),
                title: trimmed,
                createdAt: new Date().toISOString(),
                items: [],
                count: 0,
                lastModified: new Date().toISOString(),
            };

            return { folders: [...prev.folders, createdFolder] };
        });

        if (duplicate) throw new Error("Folder name already exists");
        return createdFolder;
    }, []);

    const deleteFolder = useCallback((folderId) => {
        setBacklog((prev) => ({
            folders: prev.folders.filter((folder) => folder.id !== folderId),
        }));
    }, []);

    const getFolderById = useCallback(
        (id) => backlog.folders.find((f) => f.id === id) || null,
        [backlog.folders]
    );

    const getFolders = useCallback(() => backlog.folders, [backlog.folders]);

    /* ------------------ Item Functions ------------------ */

    const addItemsToFolders = useCallback((itemData, folderIds) => {
        if (!itemData || !Array.isArray(folderIds) || folderIds.length === 0)
            return { added: 0, skipped: 0 };

        const newItem = {
            folderItemId: generateItemId(),
            apiId: itemData.apiId,
            mediaType: itemData.mediaType || "movie",
            title: itemData.title || "Untitled",
            posterPath: itemData.posterPath || null,
            year: itemData.year || "",
            addedAt: new Date().toISOString(),
            genres: Array.isArray(itemData.genres) ? itemData.genres : [],
            providers: Array.isArray(itemData.providers)
                ? itemData.providers
                : [],
            watched: false,
        };

        let addedCount = 0;
        let skippedCount = 0;

        setBacklog((prev) => {
            const updatedFolders = prev.folders.map((folder) => {
                if (!folderIds.includes(folder.id)) return folder;

                // Check if the item already exists (by API ID)
                const alreadyExists = folder.items.some(
                    (it) => it.apiId === newItem.apiId
                );
                if (alreadyExists) {
                    skippedCount++;
                    return folder;
                }

                const updatedItems = [...folder.items, newItem];
                addedCount++;

                return {
                    ...folder,
                    items: updatedItems,
                    count: updatedItems.length,
                    lastModified: new Date().toISOString(),
                };
            });

            return { folders: updatedFolders };
        });

        // Return info about how many were added vs skipped
        return { added: addedCount, skipped: skippedCount };
    }, []);

    const removeItemFromFolder = useCallback((folderId, identifier) => {
        setBacklog((prev) => {
            const updatedFolders = prev.folders.map((folder) => {
                if (folder.id !== folderId) return folder;

                const filtered = folder.items.filter(
                    (it) =>
                        it.apiId !== identifier &&
                        it.folderItemId !== identifier
                );

                return {
                    ...folder,
                    items: filtered,
                    count: filtered.length,
                    lastModified: new Date().toISOString(),
                };
            });

            return { folders: updatedFolders };
        });
    }, []);

    /* ------------------ Value ------------------ */

    const value = useMemo(
        () => ({
            folders: backlog.folders,
            createFolder,
            deleteFolder,
            getFolderById,
            getFolders,
            validateFolderTitle,
            addItemsToFolders,
            removeItemFromFolder,
        }),
        [
            backlog.folders,
            createFolder,
            deleteFolder,
            getFolderById,
            getFolders,
            validateFolderTitle,
            addItemsToFolders,
            removeItemFromFolder,
        ]
    );

    return (
        <BacklogContext.Provider value={value}>
            {children}
        </BacklogContext.Provider>
    );
};

/* --- Hook --- */
export const useBacklog = () => {
    const ctx = useContext(BacklogContext);
    if (!ctx) {
        throw new Error("useBacklog must be used within a BacklogProvider");
    }
    return ctx;
};
