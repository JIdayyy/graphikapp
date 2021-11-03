/* eslint-disable no-multi-assign */
import { Box, Button } from "@chakra-ui/react";
import React, { ReactElement } from "react";

function getRandom(max: number, min: number) {
    return (Math.floor(Math.random() * (max - min)) + min) * 90;
}
const rotate = (max: number, min: number, cube: HTMLElement | null): void => {
    const xRand = getRandom(max, min);
    const yRand = getRandom(max, min);
    const test = cube;
    if (!test) return;
    test.style.transform = `rotateX(${xRand}deg) rotateY(${yRand}deg)`;
};

export default function Random(): ReactElement {
    const handleClick = () => {
        const cube = document.getElementById("cube");

        const min = 1;
        const max = 24;

        rotate(max, min, cube);
    };

    return (
        <Box
            overflowY="scroll"
            paddingX={1}
            fontFamily="heading"
            height="100%"
            backgroundColor="black"
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
        >
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
            <Button colorScheme="blue" onClick={() => handleClick()}>
                Fais tourner le dé
            </Button>
        </Box>
    );
}
