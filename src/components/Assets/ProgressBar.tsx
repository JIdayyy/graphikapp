import React, { ReactElement } from "react";
import { Box } from "@chakra-ui/react";

interface Props {
    progress: number;
}

export default function ProgressBar({ progress }: Props): ReactElement {
    return (
        <Box
            display="flex"
            justifyContent="start"
            borderColor="gray.300"
            width="100%"
            borderRadius={5}
            height="10"
            border="2px"
        >
            <Box
                backgroundColor="purple.default"
                height="100%"
                width="100%"
                style={{ width: `${progress}%` }}
            />
        </Box>
    );
}
