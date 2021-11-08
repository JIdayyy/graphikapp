import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import ThemeList from "@components/Lists/ThemeList";
import SwitchButton from "../src/components/Buttons/SwitchButton";
import scrollBar from "../src/components/Assets/scrollBar";

const Home: NextPage = () => {
    const [isList, setIsList] = useState(false);

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
            justifyContent="center"
        >
            <Box display="flex" justifyContent="space-between" paddingX={2}>
                <SwitchButton
                    isList={isList}
                    setIsList={setIsList}
                    type="Cartes"
                />
                <SwitchButton
                    isList={isList}
                    setIsList={setIsList}
                    type="Liste"
                />
            </Box>

            <ThemeList />
        </Box>
    );
};

export default Home;
