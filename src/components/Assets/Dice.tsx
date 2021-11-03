import React, { ReactElement } from "react";

export default function Dice(): ReactElement {
    return (
        <section className="container">
            <div id="cube">
                <div className="front">
                    <span className="dot" />
                </div>
                <div className="back">
                    <span className="dot dot1" />
                </div>
                <div className="right">
                    <span className="dot dot1" />
                </div>
                <div className="left">
                    <span className="dot dot1" />
                </div>
                <div className="top">
                    <span className="dot dot1" />
                </div>
                <div className="bottom">
                    <span className="dot dot1" />
                </div>
            </div>
        </section>
    );
}
