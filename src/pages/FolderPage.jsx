import React, { useEffect, useState } from "react";
import { imageBaseURL, API_KEY, fetchDataFromAPI } from "../utils/api";
import LoadingOverlay from "../components/LoadingOverlay";
import FolderHeader from "../components/FolderHeader";
import FolderGrid from "../components/FolderGrid";
import AddToFolder from "../components/AddToFolder";
import CreateFolder from "../components/CreateFolder";
import DeleteFolderItem from "../components/DeleteFolderItem";
import Filter from "../components/Filter";

const FolderPage = () => {
    const [mediaList, setMediaList] = useState([]);
    const [loading, setLoading] = useState(true);

    // Folder movies
    useEffect(() => {
        const fetchMediaList = async () => {
            setLoading(true);
            const results = [];

            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=pokemon&include_adult=false&language=en-US&page=1`
                );
                const data = await res.json();

                setMediaList(data.results);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMediaList();
    }, []);

    return (
        <main>
            {loading && <LoadingOverlay />}

            {!loading && (
                <>
                    <article page-content="">
                        <section className="container">
                            <FolderHeader />
                            {mediaList.length > 0 && (
                                <FolderGrid mediaList={mediaList} />
                            )}
                        </section>
                    </article>

                    <AddToFolder />
                    <CreateFolder />
                    <DeleteFolderItem />
                    <Filter />
                </>
            )}
        </main>
    );
};

export default FolderPage;
