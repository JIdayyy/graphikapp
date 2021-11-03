import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import ThemeCard from "../src/components/Cards/ThemeCard";
import SwitchButton from "../src/components/Buttons/SwitchButton";

const fakeThemes = [
    "Bateau",
    "Action",
    "Pêche",
    "Passion",
    "Bateau",
    "Action",
    "Pêche",
    "Passion",
];

const Home: NextPage = () => {
    const [isList, setIsList] = useState(false);

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
            <Box
                height="100%"
                width="100%"
                flexWrap="wrap"
                display="flex"
                flexDirection="row"
                justifyContent="center"
            >
                {fakeThemes.map((theme) => (
                    <ThemeCard theme={theme} />
                ))}
            </Box>
        </Box>
    );
};

export default Home;
