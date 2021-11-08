import React, { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
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
                borderRadius={2}
            >
                <Box
                    borderRadius={8}
                    height="100%"
                    width="100%"
                    position="relative"
                    overflow="hidden"
                >
                    <Image src="/images/picture.jpg" layout="fill" />
                </Box>
            </Box>
        </Link>
    );
}
