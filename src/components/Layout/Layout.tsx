import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React, { ReactElement, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Menu from "../Menu/Menu";

interface IProps {
    children: ReactElement;
}

export default function Layout({ children }: IProps): ReactElement {
    const [isMenu, setIsMenu] = useState(false);
    return (
        <Box height="100vh" width="100vw" backgroundColor="black">
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
