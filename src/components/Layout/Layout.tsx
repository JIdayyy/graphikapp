import { Box } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface IProps {
    children: ReactElement;
}

export default function Layout({ children }: IProps): ReactElement {
    return (
        <Box height="100vh" width="100vw">
            <Navbar />
            <Box
                position="fixed"
                paddingTop={28}
                paddingBottom={16}
                height="100%"
                width="100%"
            >
                {children}
            </Box>
            <Footer />
        </Box>
    );
}
