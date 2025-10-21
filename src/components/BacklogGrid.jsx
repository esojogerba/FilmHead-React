import React from "react";
import { useBacklog } from "../contexts/BacklogContext";
import Folder from "./Folder";

const BacklogGrid = () => {
    const { folders } = useBacklog();

    // Sort folders from most recently modified
    const sortedFolders = [...folders].sort(
        (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
    );

    return (
        <div className="backlog-grid">
            {sortedFolders.length > 0 ? (
                sortedFolders.map((folder) => (
                    <Folder key={folder.id} folder={folder} />
                ))
            ) : (
                <p className="empty-backlog-message">No folders yet.</p>
            )}
        </div>
    );
};

export default BacklogGrid;
