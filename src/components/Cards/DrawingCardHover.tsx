import React, { ReactElement } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";

interface Props {
    isHover: boolean;
    drawing: Drawing;
    hoverRef: React.RefObject<HTMLDivElement>;
}

const MotionBox = motion(Box);

const DrawingCardHover = ({
    isHover,
    drawing,
    hoverRef,
}: Props): ReactElement => (
    <AnimatePresence>
        {isHover && (
            <MotionBox
                display="flex"
                justifyContent="center"
                flexDirection="column"
                shadow="dark-lg"
                animate={{ opacity: 1, width: 300, height: 300 }}
                initial={{ opacity: 0, width: 200, height: 200 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                position="absolute"
                exit={{ opacity: 0, width: 200, height: 200 }}
                z-index={999}
            >
                <Image src={drawing.url} width={300} height={300} />
                <Box p={10} backgroundColor="background.desktop">
                    <Text color="white">{drawing.name}</Text>
                </Box>
            </MotionBox>
        )}
    </AnimatePresence>
);

const DrawingCardHoverDOM = ({ isHover, drawing, hoverRef }: Props) => {
    const target = hoverRef.current;
    if (!target) return null;
    const CardDOM = (
        <DrawingCardHover
            isHover={isHover}
            drawing={drawing}
            hoverRef={hoverRef}
        />
    );
    return createPortal(CardDOM, target);
};

export default DrawingCardHoverDOM;
