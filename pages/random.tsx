/* eslint-disable no-multi-assign */
import { Box, Button } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import Dice from "../src/components/Assets/Dice";
import useDiceRotate from "../src/Hooks/useDiceRotate";

export default function Random(): ReactElement {
    const rotate = useDiceRotate();

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
            justifyContent="center"
            alignItems="center"
        >
            <Dice />
            <Button colorScheme="red" onClick={() => rotate()}>
                Fais tourner le dé
            </Button>
        </Box>
    );
}
