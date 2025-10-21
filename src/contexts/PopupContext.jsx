import React, { createContext, useState, useContext, useCallback } from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
    const [activePopup, setActivePopup] = useState(null);
    const [popupData, setPopupData] = useState(null); // 🔹 used to store folder id

    const openPopup = useCallback((popupName, data = null) => {
        setActivePopup(popupName);
        setPopupData(data);
    }, []);

    const closePopup = useCallback(() => {
        setActivePopup(null);
        setPopupData(null);
    }, []);

    return (
        <PopupContext.Provider
            value={{ activePopup, popupData, openPopup, closePopup }}
        >
            {children}
        </PopupContext.Provider>
    );
};

export const usePopup = () => useContext(PopupContext);
