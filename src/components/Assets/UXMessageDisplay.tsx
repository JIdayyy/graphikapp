import React, { ReactElement } from "react";
import { Text } from "@chakra-ui/react";

interface Props {
    UXMessage: string;
}

export default function UXMessageDisplay({ UXMessage }: Props): ReactElement {
    return (
        <>{UXMessage ? <Text color="text.error">{UXMessage}</Text> : <></>}</>
    );
}
