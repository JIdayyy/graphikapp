import React, { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import UploadImageForm from "../src/components/Forms/UploadImageForm";

export default function Upload(): ReactElement {
    return (
        <Box backgroundColor="background.mobile" width="100%" height="100%">
            <UploadImageForm />
        </Box>
    );
}
