import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchOverlay from "../components/SearchOverlay";
import { SearchProvider } from "../contexts/SearchContext";

const MainLayout = () => {
    return (
        <SearchProvider>
            <Navbar />
            <SearchOverlay />
            <Outlet />
            <Footer />
        </SearchProvider>
    );
};

export default MainLayout;
