import React, { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function Footer(): ReactElement {
    return (
        <Box
            p={4}
            shadow="2xl"
            position="fixed"
            width="100%"
            bottom="0"
            backgroundColor="purple.default"
            height="16"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            display="flex"
        >
            <Link passHref href="/">
                <Image
                    src="/icons/FooterIcons/dots.png"
                    width={50}
                    height={50}
                    quality={100}
                    priority
                />
            </Link>
            <Image
                src="/icons/FooterIcons/draws.png"
                width={30}
                height={30}
                quality={100}
                priority
            />
            <Link passHref href="/random">
                <Image
                    src="/icons/FooterIcons/dice.png"
                    width={30}
                    height={30}
                    quality={100}
                    priority
                />
            </Link>
        </Box>
    );
}
