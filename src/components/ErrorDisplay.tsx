import React, { ReactElement } from "react";
import { Text, Container } from "@chakra-ui/react";

export default function ErrorDisplay(): ReactElement {
    return (
        <Container>
            <Text color="white">
                Désolé il s&apos;est passé quelque chose d&apos;innatendu,
                veuillez réessayer ...
            </Text>
        </Container>
    );
}
