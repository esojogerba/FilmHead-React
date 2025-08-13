import React from "react";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import DetailsPage from "./pages/DetailsPage";

// TODO: Fix router to match RC2024.

const App = () => {
    const basename = import.meta.env.PROD ? "/FilmHead-React" : "/";

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="movies" element={<MoviesPage />} />
                <Route path="details/:type/:id" element={<DetailsPage />} />
            </Route>
        ),
        { basename }
    );

    return <RouterProvider router={router} />;
};

export default App;
