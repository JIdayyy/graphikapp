import React, { ReactElement } from "react";
import Image from "next/image";
import { Box } from "@chakra-ui/react";

interface Props {
    image: File | undefined;
    imageResponse: string;
}

export default function ImagePreview({
    imageResponse,
    image,
}: Props): ReactElement {
    return (
        <Box
            position="relative"
            display="flex"
            justifyContent="center"
            width={200}
            height={200}
        >
            {imageResponse || image ? (
                <Image layout="fill" src={URL.createObjectURL(image)} />
            ) : (
                <Image
                    src="/icons/drawing_upload.png"
                    width={100}
                    height={100}
                    layout="fixed"
                />
            )}
        </Box>
    );
}
