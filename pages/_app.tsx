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
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "../src/components/Layout/Layout";
import DesktopLayout from "../src/components/Layout/DesktopLayout";
import theme from "../styles/theme";
import checkMobile from "../src/lib/checkMobile";
import ErrorBoundary from "../src/ErrorBoundary";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
});

function MyApp({ Component, pageProps }: AppProps) {
    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

    const router = useRouter();

    useEffect(() => {
        checkMobile(setIsDesktop, router);
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <CSSReset />
                {!isDesktop && isDesktop !== null && (
                    <Layout>
                        <ErrorBoundary>
                            <Component {...pageProps} />
                        </ErrorBoundary>
                    </Layout>
                )}
                {isDesktop && isDesktop !== null && (
                    <DesktopLayout>
                        <ErrorBoundary>
                            <Component {...pageProps} />
                        </ErrorBoundary>
                    </DesktopLayout>
                )}
                <ToastContainer autoClose={3000} />
            </ChakraProvider>
        </QueryClientProvider>
    );
}

export default MyApp;
