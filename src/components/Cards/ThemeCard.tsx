import React, { ReactElement } from "react";
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { Theme } from ".prisma/client";

interface Props {
    theme: Theme;
}

export default function ThemeCard({ theme }: Props): ReactElement {
    return (
        <Link passHref href={`/themes/${theme.id}/drawings`}>
            <Box
                width="47%"
                height="35%"
                margin={1}
                backgroundColor="gray.800"
                border="2px"
                borderColor="gray.500"
                borderRadius={2}
            >
                <Box height="60%" width="100%" position="relative">
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
                    <Text color="red.default">{theme.name}</Text>
                    <Text fontSize="10" color="white">
                        0 Dessins
                    </Text>
                </Box>
            </Box>
        </Link>
    );
}
