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
    useEffect(() => {
        const doc = document.documentElement.requestFullscreen({
            navigationUI: "hide",
        });
        console.log(doc);
    }, []);
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
