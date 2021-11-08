import React, { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import DrawingList from "@components/Lists/DrawingList";
import scrollBar from "@components/Assets/scrollBar";

export default function Drawings(): ReactElement {
    return (
        <Box
            sx={scrollBar}
            overflowY="scroll"
            paddingX={1}
            fontFamily="heading"
            height="100%"
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="start"
        >
            <DrawingList />
        </Box>
    );
}
