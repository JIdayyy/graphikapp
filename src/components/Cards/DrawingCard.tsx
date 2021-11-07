import React, { ReactElement } from "react";
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { Drawing } from ".prisma/client";

interface Props {
    drawing: Drawing;
}

export default function DrawingCard({ drawing }: Props): ReactElement {
    return (
        <Link passHref href={`/drawings/${drawing.id}`}>
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
                    <Image src={drawing.url} layout="fill" />
                </Box>
                <Box
                    p={2}
                    height="40%"
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                >
                    <Text color="red.default">{drawing.drawing_name}</Text>
                </Box>
            </Box>
        </Link>
    );
}
