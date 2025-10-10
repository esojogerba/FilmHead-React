import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

/**
 * Backlog context (folders-only)
 *
 * Provides persistent storage (localStorage) for folders and exposes:
 * - folders (array)
 * - createFolder(title) -> creates folder or throws Error on invalid input
 * - deleteFolder(folderId)
 * - getFolderById(folderId)
 * - getFolders() -> array
 * - validateFolderTitle(title) -> { valid: boolean, error: string | null }
 *
 * Folder shape:
 * {
 *   id: string,
 *   title: string,
 *   createdAt: ISOString,
 *   posters: string[] (max 3) - poster paths of first up to 3 items,
 *   items: [] (not used yet),
 *   count: number (items.length),
 *   lastModified: ISOString
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
    return `folder-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
};

/**
 * Ensure a folder object has the fields we expect.
 * This helps when loading older persisted data and keeps the app stable.
 */
const sanitizeFolder = (raw = {}) => {
    const id = raw.id || generateId();
    const title = typeof raw.title === "string" ? raw.title : "Untitled";
    const createdAt = raw.createdAt || raw.addedAt || new Date().toISOString();
    // posters should be an array (only keep up to 3)
    const posters = Array.isArray(raw.posters) ? raw.posters.slice(0, 3) : [];
    const items = Array.isArray(raw.items) ? raw.items : [];
    const count =
        typeof raw.count === "number" ? raw.count : items ? items.length : 0;
    const lastModified = raw.lastModified || raw.updatedAt || createdAt;

    return {
        id,
        title,
        createdAt,
        posters,
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
    // Load once on mount
    const [backlog, setBacklog] = useState(() => loadBacklog());

    // Persist whenever the backlog changes
    useEffect(() => {
        persistBacklog(backlog);
    }, [backlog]);

    /**
     * validateFolderTitle(title)
     * quick client-side validation you can use to enable/disable Done button
     * Returns { valid: boolean, error: string | null }
     */
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

    /**
     * createFolder(title)
     * - throws Error("Folder name cannot be empty") if empty
     * - throws Error("Folder name already exists") if duplicate (case-insensitive)
     * - returns the created folder object on success
     *
     * Implementation note: we use the functional setState and capture a duplicate flag
     * to avoid races if multiple callers attempt to create at the same time.
     */
    const createFolder = useCallback((title) => {
        const trimmed = (title || "").trim();
        if (!trimmed) {
            throw new Error("Folder name cannot be empty");
        }

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
                posters: [], // initially empty; will hold up to 3 poster paths later
                items: [], // items are not implemented yet
                count: 0,
                lastModified: new Date().toISOString(),
            };

            return {
                folders: [...prev.folders, createdFolder],
            };
        });

        if (duplicate) {
            throw new Error("Folder name already exists");
        }

        return createdFolder;
    }, []);

    /**
     * deleteFolder(folderId)
     * - removes folder by id
     */
    const deleteFolder = useCallback((folderId) => {
        setBacklog((prev) => ({
            folders: prev.folders.filter((folder) => folder.id !== folderId),
        }));
    }, []);

    /**
     * getFolderById(id) and getFolders()
     */
    const getFolderById = useCallback(
        (id) => backlog.folders.find((f) => f.id === id) || null,
        [backlog.folders]
    );

    const getFolders = useCallback(() => backlog.folders, [backlog.folders]);

    const value = useMemo(
        () => ({
            folders: backlog.folders,
            createFolder,
            deleteFolder,
            getFolderById,
            getFolders,
            validateFolderTitle,
        }),
        [
            backlog.folders,
            createFolder,
            deleteFolder,
            getFolderById,
            getFolders,
            validateFolderTitle,
        ]
    );

    return (
        <BacklogContext.Provider value={value}>
            {children}
        </BacklogContext.Provider>
    );
};

/**
 * useBacklog()
 */
export const useBacklog = () => {
    const ctx = useContext(BacklogContext);
    if (!ctx) {
        throw new Error("useBacklog must be used within a BacklogProvider");
    }
    return ctx;
};
