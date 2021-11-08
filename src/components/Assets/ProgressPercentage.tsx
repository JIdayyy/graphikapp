import React, { ReactElement } from "react";
import { Text } from "@chakra-ui/react";

interface Props {
    progress: number;
}

export default function ProgressPercentage({ progress }: Props): ReactElement {
    return (
        <Text borderRadius={4} width="100%" textAlign="left">
            Upload {progress ? Math.floor(progress) : "0"}%{" "}
        </Text>
    );
}
