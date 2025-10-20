import React, {
    createContext,
    useCallback,
    useContext,
    useState,
    useEffect,
} from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, duration = 3000) => {
        setToast(message);
        // automatically clear after duration
        setTimeout(() => setToast(null), duration);
    }, []);

    // slight fade-in/out timing class control
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (toast) {
            setVisible(true);
            const hideTimer = setTimeout(() => setVisible(false), 1800);
            return () => clearTimeout(hideTimer);
        }
    }, [toast]);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* === Toast UI === */}
            {toast && (
                <div
                    className={`toast ${visible ? "show" : ""}`}
                    role="status"
                    aria-live="polite"
                >
                    {toast}
                </div>
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used inside a ToastProvider");
    return ctx;
};
