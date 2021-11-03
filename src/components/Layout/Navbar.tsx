import { Input, Box, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiDocumentAdd } from "react-icons/hi";

import React, { ReactElement } from "react";

export default function Navbar(): ReactElement {
    return (
        <Box
            p={4}
            position="fixed"
            top="0"
            shadow="2xl"
            backgroundColor="purple.default"
            height="28"
            width="100%"
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
            display="flex"
        >
            <Box width="100%" display="flex" justifyContent="space-between">
                <GiHamburgerMenu size={30} color="white" />
                <HiDocumentAdd size={30} color="white" />
            </Box>
            <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <FaSearch color="gray.300" />
                </InputLeftElement>
                <Input
                    backgroundColor="white"
                    type="tel"
                    placeholder="Rechercher un Theme ..."
                />
            </InputGroup>
        </Box>
    );
}
