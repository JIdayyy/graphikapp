import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import ThemeList from "@components/Lists/ThemeList";

const Home: NextPage = () => (
    <Box
        paddingX={1}
        fontFamily="heading"
        height="100%"
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
    >
        <ThemeList />
    </Box>
);

export default Home;
