import { Input, Box, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiDocumentAdd } from "react-icons/hi";

import React, { Dispatch, ReactElement, SetStateAction } from "react";

interface IProps {
    setIsMenu: Dispatch<SetStateAction<boolean>>;
}

export default function Navbar({ setIsMenu }: IProps): ReactElement {
    return (
        <Box
            p={4}
            zIndex={100}
            shadow="dark-lg"
            backgroundColor="red.default"
            height="28"
            width="100%"
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
            display="flex"
        >
            <Box
                zIndex={10}
                width="100%"
                display="flex"
                justifyContent="space-between"
            >
                <GiHamburgerMenu
                    cursor="pointer"
                    onClick={() => setIsMenu((c) => !c)}
                    size={30}
                    color="white"
                />
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
