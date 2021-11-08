import React, { ReactElement } from "react";
import { Box } from "@chakra-ui/react";

export default function Loader(): ReactElement {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
            className="lds-roller"
        >
            <div className="lds-roller">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>
        </Box>
    );
}
