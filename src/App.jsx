import React from "react";
import Navbar from "./components/Navbar";
import CallToAction from "./components/CallToAction";
import Features from "./components/Features";

const App = () => {
    return (
        <>
            <Navbar />

            <div className="transition transition-1">
                <div className="spinner" />
            </div>

            <main>
                <CallToAction />

                <Features />

                <div className="pop-up-overlay" />
                <div className="pop-up-overlay second-overlay" />
            </main>
        </>
    );
};

export default App;
