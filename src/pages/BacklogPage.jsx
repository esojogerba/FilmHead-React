import React from "react";
import BacklogHeader from "../components/BacklogHeader";
import BacklogGrid from "../components/BacklogGrid";
import AddToFolder from "../components/AddToFolder";
import CreateFolder from "../components/CreateFolder";
import { usePopup } from "../contexts/PopupContext";

const BacklogPage = () => {
    const { activePopup, openPopup, closePopup } = usePopup();

    // Helper function to close CreateFolder and reopen AddToFolder
    const handleCloseCreateFolder = () => {
        closePopup(); // close create folder popup
        // small timeout so popup transition looks smooth
        setTimeout(() => {
            openPopup("addToFolder");
        }, 150);
    };

    return (
        <main>
            <article page-content="">
                <section className="container">
                    <BacklogHeader
                        onAddToFolder={() => openPopup("addToFolder")}
                    />
                    <BacklogGrid />
                </section>
            </article>

            {activePopup === "addToFolder" && (
                <AddToFolder
                    onClose={closePopup}
                    onCreateFolder={() => openPopup("createFolder")}
                />
            )}

            {activePopup === "createFolder" && (
                <CreateFolder onClose={handleCloseCreateFolder} />
            )}
        </main>
    );
};

export default BacklogPage;
