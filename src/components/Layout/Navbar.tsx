import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import { theme } from "@Fetcher/httpFetcher";
import { Box, HStack, Text } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { MdNotificationsNone } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Loader from "@components/Assets/Loader";
import { GoSettings } from "react-icons/go";
import { NavScrollBar } from "@components/Assets/scrollBar";
import { Theme } from ".prisma/client";

export default function Navbar(): ReactElement {
    const { data, isLoading, error } = useQuery<Theme[]>("getTheme", () =>
        theme.getAll(),
    );

    if (isLoading) return <Loader />;
    if (error) return <Text>Error</Text>;
    if (!data || data.length === 0) return <Text>No data</Text>;

    return (
        <Box
            p={4}
            zIndex={100}
            shadow="dark-lg"
            backgroundColor="navbar.default"
            width="100%"
            position="fixed"
            top={0}
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            display="flex"
        >
            <Box
                zIndex={10}
                width="100%"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Text fontWeight="bold">GRAFIKAPP</Text>

                <HStack spacing={4}>
                    <FaSearch color="white" size={17} />
                    <MdNotificationsNone color="white" size={20} />
                    <CgProfile color="white" size={20} />
                </HStack>
            </Box>
            <HStack width="100%" marginTop={2}>
                <GoSettings color="white" size={20} />
                <HStack sx={NavScrollBar} overflowX="scroll" width="100%">
                    {data?.map((themeItem) => (
                        <Text whiteSpace="nowrap">{themeItem.name}</Text>
                    ))}
                </HStack>
            </HStack>
        </Box>
    );
}
