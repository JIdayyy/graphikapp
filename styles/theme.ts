import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        heading: "Archivo",
        body: "Archivo",
    },
    colors: {
        purple: {
            default: "#8C65CE",
        },
        background: {
            mobile: "#000000",
            desktop: "#141414",
        },
        text: {
            error: "#FF0000",
        },
    },
});
export default theme;
