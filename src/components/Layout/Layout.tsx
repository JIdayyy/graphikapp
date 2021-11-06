import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React, { ReactElement, useState } from "react";
import Div100vh from "react-div-100vh";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Menu from "../Menu/Menu";
import useOnClickOutside from "../../Hooks/useOnCLickOutside";

interface IProps {
    children: ReactElement;
}

export default function Layout({ children }: IProps): ReactElement {
    const [isMenu, setIsMenu] = useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    const handleClickOutside = (): void => {
        setIsMenu(false);
    };
    useOnClickOutside(ref, handleClickOutside);

    return (
        <Div100vh>
            <Box
                width="100%"
                height="100%"
                backgroundColor="black"
                position="absolute"
                top={0}
                left={0}
            >
                <Head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                    />
                    <meta name="description" content="Description" />
                    <meta name="keywords" content="Keywords" />
                    <title>Grafikapp</title>
                    <link rel="manifest" href="/manifest.json" />
                    <link
                        href="/icons/favicon-16x16.png"
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                    />
                    <link
                        href="/icons/favicon-32x32.png"
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                    />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="theme-color" content="#8C65CE" />
                    <meta
                        name="apple-mobile-web-app-status-bar"
                        content="#8C65CE"
                    />
                    <link rel="apple-touch-icon" href="/about.png" />
                </Head>
                <Box
                    position="fixed"
                    display="flex"
                    justifyContent="space-between"
                    flexDirection="column"
                    height="100%"
                    width="100%"
                >
                    <Menu ref={ref} isMenu={isMenu} />
                    <Navbar setIsMenu={setIsMenu} />
                    {children}
                    <Footer />
                </Box>
            </Box>
        </Div100vh>
    );
}
