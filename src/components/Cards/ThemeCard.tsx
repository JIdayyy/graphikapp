import React, { ReactElement } from "react";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";

interface Props {
    theme: string;
}

export default function ThemeCard({ theme }: Props): ReactElement {
    return (
        <Box
            width="47%"
            height="30%"
            margin={1}
            backgroundColor="gray.800"
            border="2px"
            borderColor="gray.500"
            borderRadius={8}
        >
            <Box
                height="60%"
                width="100%"
                position="relative"
                borderTopRadius={8}
            >
                <Image src="/images/picture.jpg" layout="fill" />
            </Box>
            <Box
                p={2}
                height="40%"
                width="100%"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
            >
                <Text color="purple.default">{theme}</Text>
                <Text fontSize="10" color="white">
                    0 Dessins
                </Text>
            </Box>
        </Box>
    );
}
