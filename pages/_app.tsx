/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import "@fontsource/archivo";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import Layout from "../src/components/Layout/Layout";
import useWindowSize from "../src/Hooks/useWindowDimension";
import DesktopLayout from "../src/components/Layout/DesktopLayout";
import theme from "../styles/theme";
import checkMobile from "../src/lib/checkMobile";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
    const { width } = useWindowSize();
    const router = useRouter();

    useEffect(() => {
        checkMobile(width, setIsDesktop, router);
    }, [width]);

    return (
        <ChakraProvider theme={theme}>
            <CSSReset />
            {!isDesktop && isDesktop !== null && (
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            )}
            {isDesktop && isDesktop !== null && (
                <DesktopLayout>
                    <Component {...pageProps} />
                </DesktopLayout>
            )}
            <ToastContainer autoClose={3000} />
        </ChakraProvider>
    );
}

export default MyApp;
