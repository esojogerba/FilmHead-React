import React, { createContext, useContext, useState } from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
    const [popupStack, setPopupStack] = useState([]); // stack of open popups

    const openPopup = (popupName) => {
        setPopupStack((prev) => [...prev, popupName]);
    };

    const closePopup = () => {
        setPopupStack((prev) => prev.slice(0, -1)); // remove last popup
    };

    const activePopup = popupStack[popupStack.length - 1] || null;

    return (
        <PopupContext.Provider value={{ activePopup, openPopup, closePopup }}>
            {children}
        </PopupContext.Provider>
    );
};

export const usePopup = () => useContext(PopupContext);
