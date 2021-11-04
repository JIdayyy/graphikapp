import { Box, Text, Portal } from "@chakra-ui/react";
import React, { ReactElement, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import useHover from "../../Hooks/useHover";

import DrawingCardHoverDOM from "./DrawingCardHover";

interface Props {
    drawing: Drawing;
}

const MotionBox = motion(Box);

export default function DrawingCardDesktop({ drawing }: Props): ReactElement {
    const hoverRef = useRef(null);
    const isHover = useHover(hoverRef);

    return (
        <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            position="relative"
            alignItems="center"
            z-index={1}
            ref={hoverRef}
            overflow="visible"
            width="350px"
            cursor="pointer"
            height="350px"
        >
            <Image
                src={drawing.url}
                layout="intrinsic"
                width={200}
                height={200}
            />

            <Text>{drawing.name}</Text>
            <DrawingCardHoverDOM
                isHover={isHover}
                hoverRef={hoverRef}
                drawing={drawing}
            />
        </Box>
    );
}
