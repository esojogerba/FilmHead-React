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
import ShowsPage from "./pages/ShowsPage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import MediaGridPage from "./pages/MediaGridPage";
import BacklogPage from "./pages/BacklogPage";

const App = () => {
    const basename = import.meta.env.PROD ? "/FilmHead-React" : "/";

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="movies" element={<MoviesPage />} />
                <Route path="shows" element={<ShowsPage />} />
                <Route path="backlog" element={<BacklogPage />} />
                <Route path="details/:type/:id" element={<DetailsPage />} />
                <Route path="sign-up" element={<SignUpPage />} />
                <Route path="log-in" element={<LogInPage />} />
                <Route
                    path=":type/gridlist/:list"
                    element={<MediaGridPage />}
                />
            </Route>
        ),
        { basename }
    );

    return <RouterProvider router={router} />;
};

export default App;
