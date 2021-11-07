import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        heading: "Archivo",
        body: "Archivo",
    },
    colors: {
        purple: {
            default: "#F3444F",
        },
        background: {
            mobile: "#000000",
            desktop: "#141414",
        },
        text: {
            error: "#FF0000",
        },
    },
    boxShadow: {
        input: "inset 0px 1px 8px rgba(0, 0, 0, 0.8)",
    },
});
export default theme;
