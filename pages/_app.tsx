/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/archivo";
import Router from "next/router";
import NProgress from "nprogress";
import { toast, ToastContainer } from "react-toastify";
import "nprogress/nprogress.css";

const theme = extendTheme({
    fonts: {
        heading: "Archivo",
        body: "Archivo",
    },
    colors: {
        purple: {
            default: "#8C65CE",
        },
    },
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
    const notify = () => toast("Hey Bienvenue à toi !");
    notify();
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
            <ToastContainer autoClose={3000} />
        </ChakraProvider>
    );
}

export default MyApp;
