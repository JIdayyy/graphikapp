/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, CSSReset, Button } from "@chakra-ui/react";
import "@fontsource/archivo";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from "@Context/UserContext";
import pwaTrackingListeners from "../scripts/pwaEventlisteners";
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

    const handleClick = () => {
        if (window.deferredPrompt) {
            window.deferredPrompt.prompt();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.deferredPrompt.userChoice.then((choiceResult: any) => {
                console.log("👍", "userChoice", choiceResult);
                window.deferredPrompt = null;
            });
        }
    };
    const notify = () =>
        toast(
            <div>
                <Button onClick={handleClick}>INSTALL ! 🖥️</Button>
                This app can be install on your phone/computer. Please click the
                install button to install the app.
            </div>,
        );

    useEffect(() => {
        checkMobile(setIsDesktop, router);
        const isBrowser = typeof window !== "undefined";
        if (isBrowser) {
            pwaTrackingListeners();
        }
        window.addEventListener("beforeinstallprompt", (event) => {
            console.log("👍", "beforeinstallprompt", event);
            // Stash the event so it can be triggered later.
            window.deferredPrompt = event;
            notify();
        });
    }, []);

    useEffect(() => {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker.register("/sw.js").then(
                    (registration) => {
                        console.log(
                            "Service Worker registration successful with scope: ",
                            registration.scope,
                        );
                    },
                    (err) => {
                        console.log(
                            "Service Worker registration failed: ",
                            err,
                        );
                    },
                );
            });
        }
    }, []);

    if (isDesktop === null) return <div>Loading</div>;

    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <CSSReset />
                <UserContextProvider>
                    <>
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
                    </>
                </UserContextProvider>
                <ToastContainer autoClose={10000} />
            </ChakraProvider>
        </QueryClientProvider>
    );
}

export default MyApp;
