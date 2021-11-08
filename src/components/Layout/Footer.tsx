import React, { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function Footer(): ReactElement {
    return (
        <Box
            p={4}
            shadow="dark-lg"
            zIndex={999}
            width="100%"
            bottom={0}
            backgroundColor="navbar.default"
            position="fixed"
            height="10"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            display="flex"
        >
            <Link passHref href="/">
                <button type="button">
                    <Image
                        src="/icons/FooterIcons/dots.png"
                        width={25}
                        height={25}
                        quality={100}
                        priority
                    />
                </button>
            </Link>
            <Link passHref href="/">
                <button type="button">
                    <Image
                        src="/icons/FooterIcons/folder_open.png"
                        width={25}
                        height={25}
                        quality={100}
                        priority
                    />
                </button>
            </Link>
            <Link passHref href="/upload">
                <button type="button">
                    <Image
                        src="/icons/FooterIcons/cloud_upload.png"
                        width={25}
                        height={25}
                        quality={100}
                        priority
                    />
                </button>
            </Link>

            <Link passHref href="/random">
                <button type="button">
                    <Image
                        src="/icons/FooterIcons/dice.png"
                        width={25}
                        height={25}
                        quality={100}
                        priority
                    />
                </button>
            </Link>
        </Box>
    );
}
