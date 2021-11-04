import { Box, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import fakeThemes from "../../FakeDatas/fakeThemes";
import scrollBar from "../../src/components/Assets/scrollBar";
import DrawingsCarousel from "../../src/components/Carousel/DrawingsCarousel";

const DESKTOP_HOME: NextPage = () => (
    <Box
        sx={scrollBar}
        overflowY="scroll"
        backgroundColor="background.desktop"
        fontFamily="body"
        height="100%"
        width="100%"
        display="flex"
        flexDirection="column"
    >
        {fakeThemes.map((theme) => (
            <Box>
                <Text color="white">{theme}</Text>
                <DrawingsCarousel theme={theme} />
            </Box>
        ))}
    </Box>
);

export default DESKTOP_HOME;
