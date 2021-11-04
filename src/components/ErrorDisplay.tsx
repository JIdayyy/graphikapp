import React, { ReactElement } from "react";
import { Text, Box, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function ErrorDisplay(): ReactElement {
    const history = useRouter();
    return (
        <Container>
            <Text color="white">
                Désolé il s&apos;est passé quelque chose d&apos;innatendu,
                veuillez réessayer ...
            </Text>
        </Container>
    );
}
