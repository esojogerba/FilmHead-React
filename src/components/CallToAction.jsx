import React from "react";

const CallToAction = () => {
    return (
        <section className="cta">
            <h1 className="cta-heading">Nothing To Watch?</h1>
            <h1 className="cta-heading">Not Anymore!</h1>
            <p className="cta-p">
                Keep track of your media backlog so that you always have
                something to scratch your entertainment itch.
            </p>
            <button className="btn cta-btn" id="new-account-btn">
                Create An Account
            </button>
        </section>
    );
};

export default CallToAction;
