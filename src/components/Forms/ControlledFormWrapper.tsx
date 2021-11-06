import React, { ReactElement } from "react";
import { FormControl } from "@chakra-ui/react";

interface Props {
    children: JSX.Element[];
}

export default function ControlledFormWrapper({
    children,
}: Props): ReactElement {
    return (
        <FormControl
            p={4}
            height="100%"
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection="column"
            color="white"
            action=""
        >
            {children}
        </FormControl>
    );
}
