import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React, { ReactElement } from "react";

interface IProps {
    children: ReactElement;
}

export default function DesktopLayout({ children }: IProps): ReactElement {
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
            <Box position="fixed" height="100%" width="100%">
                {children}
            </Box>
        </Box>
    );
}
