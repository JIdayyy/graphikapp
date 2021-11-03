import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React, { ReactElement, useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Menu from "../Menu/Menu";

interface IProps {
    children: ReactElement;
}

export default function Layout({ children }: IProps): ReactElement {
    const [isMenu, setIsMenu] = useState(false);

    return (
        <Box
            height="100vh"
            width="100vw"
            backgroundColor="black"
            position="absolute"
            top={0}
            left={0}
        >
            <Head>
                <meta name="apple-mobile-web-app-capable" content="yes" />

                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#8C65CE" />
                <meta
                    name="apple-mobile-web-app-status-bar"
                    content="#8C65CE"
                />
                <link rel="apple-touch-icon" href="/about.png" />
            </Head>
            <Box
                position="fixed"
                paddingTop="28"
                paddingBottom="16"
                height="100%"
                width="100%"
            >
                <Menu isMenu={isMenu} />
                <Navbar setIsMenu={setIsMenu} />
                {children}
            </Box>
            <Footer />
        </Box>
    );
}
