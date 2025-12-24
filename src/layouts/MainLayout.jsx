import React, { useLayoutEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchOverlay from "../components/SearchOverlay";
import AddToFolder from "../components/AddToFolder";
import CreateFolder from "../components/CreateFolder";
import LoadingOverlay from "../components/LoadingOverlay";
import { SearchProvider } from "../contexts/SearchContext";

const NO_IMAGE_GRACE_MS = 200;
const IMAGE_LOAD_TIMEOUT_MS = 2500;

const MainLayout = () => {
    const location = useLocation();
    const pageRef = useRef(null);
    const [routeLoading, setRouteLoading] = useState(false);

    useLayoutEffect(() => {
        let isActive = true;
        let timeoutId;
        let noImageTimerId;
        const pendingListeners = [];
        const trackedImages = new Set();
        const pendingImages = new Set();
        let trackingImages = false;

        const finish = () => {
            if (isActive) {
                setRouteLoading(false);
            }
        };

        const isImageLoaded = (img) => img.complete && img.naturalWidth > 0;

        const shouldTrackImage = (img) => {
            if (!img) return false;
            if (img.dataset.routeIgnore === "true") return false;
            return img.getAttribute("loading") !== "lazy";
        };

        const registerImage = (img) => {
            if (!shouldTrackImage(img) || trackedImages.has(img)) return;

            trackedImages.add(img);

            if (isImageLoaded(img)) {
                return;
            }

            pendingImages.add(img);

            const handler = () => {
                pendingImages.delete(img);
                if (pendingImages.size === 0 && trackingImages) {
                    clearTimeout(timeoutId);
                    finish();
                }
            };

            img.addEventListener("load", handler, { once: true });
            img.addEventListener("error", handler, { once: true });
            pendingListeners.push({ img, handler });
        };

        const trackCurrentImages = () => {
            const container = pageRef.current;
            if (!container) return;

            const images = Array.from(container.querySelectorAll("img"));
            images.forEach(registerImage);

            if (trackedImages.size === 0) {
                if (!noImageTimerId) {
                    noImageTimerId = window.setTimeout(() => {
                        if (trackedImages.size === 0 && trackingImages) {
                            clearTimeout(timeoutId);
                            finish();
                        }
                    }, NO_IMAGE_GRACE_MS);
                }
                return;
            }

            if (noImageTimerId) {
                clearTimeout(noImageTimerId);
                noImageTimerId = null;
            }

            if (pendingImages.size === 0 && trackingImages) {
                clearTimeout(timeoutId);
                finish();
            }
        };

        const hasPageOverlay = () => {
            const container = pageRef.current;
            if (!container) return false;
            return Boolean(
                container.querySelector(
                    ".loading-overlay:not(.section-overlay)"
                )
            );
        };

        const startImageTracking = () => {
            if (trackingImages) return;
            trackingImages = true;
            trackCurrentImages();
        };

        const container = pageRef.current;
        const observer = new MutationObserver(() => {
            if (!trackingImages) {
                if (!hasPageOverlay()) {
                    startImageTracking();
                }
                return;
            }

            trackCurrentImages();
        });

        setRouteLoading(true);
        if (container) {
            observer.observe(container, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ["src", "loading", "data-route-ignore"],
            });
        }

        if (!hasPageOverlay()) {
            startImageTracking();
        }

        timeoutId = window.setTimeout(finish, IMAGE_LOAD_TIMEOUT_MS);

        return () => {
            isActive = false;
            clearTimeout(timeoutId);
            clearTimeout(noImageTimerId);
            observer.disconnect();
            pendingListeners.forEach(({ img, handler }) => {
                img.removeEventListener("load", handler);
                img.removeEventListener("error", handler);
            });
        };
    }, [location.key]);

    const pageClassName = routeLoading
        ? "page-shell page-shell--loading"
        : "page-shell page-shell--ready";

    return (
        <SearchProvider>
            <Navbar />
            <SearchOverlay />
            <AddToFolder />
            <CreateFolder />
            {routeLoading && <LoadingOverlay variant="page" role="route" />}
            <div
                ref={pageRef}
                className={pageClassName}
                key={location.key}
            >
                <Outlet />
                <Footer />
            </div>
        </SearchProvider>
    );
};

export default MainLayout;
