import React, {
    createContext,
    useState,
    useContext,
    useCallback,
    useEffect,
} from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
    const [activePopup, setActivePopup] = useState(null);
    const [popupData, setPopupData] = useState(null);

    const openPopup = useCallback((popupName, data = null) => {
        setActivePopup(popupName);
        setPopupData(data);
    }, []);

    const closePopup = useCallback(() => {
        setActivePopup(null);
        setPopupData(null);
    }, []);

    // Close popups on page unload (refresh or tab close)
    useEffect(() => {
        const handleBeforeUnload = () => closePopup();
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () =>
            window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [closePopup]);

    // Close popups on client-side navigation (URL change)
    useEffect(() => {
        const handlePopState = () => closePopup();
        const handlePushState = () => closePopup();

        window.addEventListener("popstate", handlePopState);
        window.addEventListener("pushstate", handlePushState);

        // Monkey-patch pushState to trigger our event
        const origPushState = history.pushState;
        history.pushState = function (...args) {
            const result = origPushState.apply(this, args);
            window.dispatchEvent(new Event("pushstate"));
            return result;
        };

        return () => {
            window.removeEventListener("popstate", handlePopState);
            window.removeEventListener("pushstate", handlePushState);
            history.pushState = origPushState; // restore original
        };
    }, [closePopup]);

    return (
        <PopupContext.Provider
            value={{ activePopup, popupData, openPopup, closePopup }}
        >
            {children}
        </PopupContext.Provider>
    );
};

export const usePopup = () => useContext(PopupContext);
