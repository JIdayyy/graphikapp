import React, { ChangeEvent, ReactElement, useState } from "react";
import { useMutation } from "react-query";
import { Input, Box, Button, Text, FormControl } from "@chakra-ui/react";
import Image from "next/image";
import AXIOS from "../../../AXIOS/AXIOS";

export default function UploadImageForm(): ReactElement {
    const [image, setImage] = useState<File | undefined>();
    const [imageResponse, setImageResponse] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);

    const { mutateAsync } = useMutation(
        (newImage: FormData) =>
            AXIOS.post("/upload", newImage, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (p) => {
                    setProgress((p.loaded / p.total) * 100);
                },
            })
                .then((r) => r.data)
                .catch((err) => {
                    setError(err.response.data.message);
                }),
        {
            onSuccess: (data) => {
                if (data !== undefined) {
                    setImageResponse(data.url);
                }
                setProgress(0);
            },
            onError: (err) => {
                console.log("ERROR UPLOAD", err);
            },
            useErrorBoundary: true,
        },
    );

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const imageData = e.target.files[0];
        setImage(imageData);
    };

    const fileUpload = async () => {
        setProgress(0);
        if (image) {
            const formData = new FormData();
            formData.append("image", image);
            await mutateAsync(formData);
        }
    };

    return (
        <FormControl
            p={4}
            height="100%"
            width="100%"
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            color="white"
            action=""
        >
            <Input
                width="100%"
                accept="image/*"
                multiple={false}
                type="file"
                name="image"
                onChange={handleImage}
            />
            <Input
                width="100%"
                onChange={handleImage}
                accept="image/*"
                multiple={false}
                type="file"
                name="image"
                capture="environment"
            />

            <Text>Upload {progress ? Math.floor(progress) : "0"}% </Text>
            <Box
                display="flex"
                justifyContent="start"
                borderColor="gray.300"
                width="100%"
                height="10"
                border="2px"
            >
                <Box
                    backgroundColor="white"
                    height="100%"
                    width="100%"
                    style={{ width: `${progress}%` }}
                />
            </Box>
            {error && <Text color="text.error">{error}</Text>}
            <Button colorScheme="purple" type="button" onClick={fileUpload}>
                ENVOYER
            </Button>
            <Box position="relative" width={200} height={200}>
                {imageResponse && <Image layout="fill" src={imageResponse} />}
            </Box>
        </FormControl>
    );
}
