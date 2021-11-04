import React, { ChangeEvent, ReactElement, useState } from "react";
import { useMutation } from "react-query";
import { Input, Box, Button, Text } from "@chakra-ui/react";
import Image from "next/image";
import AXIOS from "../../../AXIOS/AXIOS";

type Error = { message: string; type: string };

export default function UploadImageForm(): ReactElement {
    const [image, setImage] = useState<File | undefined>();
    const [imageResponse, setImageResponse] = useState<string>("");
    const [error, setError] = useState<string>("");

    const { mutateAsync } = useMutation(
        (newImage: FormData) =>
            AXIOS.post("/upload", newImage, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((r) => r.data)
                .catch((err) => {
                    console.log(err);
                    if (err.response) {
                        setError(err.response.message);
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(err.response.data);
                        setError(err.response.data.message);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(err.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error", err.message);
                    }
                    throw err;
                }),
        {
            onSuccess: (data) => {
                console.log(data);
                if (data.type === "FILE_TOO_BIG") {
                    return setError(data.message);
                }
                return setImageResponse(data.url);
            },
            onError: (err) => {
                console.log(err);
            },
        },
    );

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const imageData = e.target.files[0];
        setImage(imageData);
    };

    const fileUpload = async () => {
        if (image) {
            const formData = new FormData();
            formData.append("image", image);
            await mutateAsync(formData);
        }
    };

    return (
        <form action="">
            <Input
                accept="image/*"
                multiple={false}
                type="file"
                name="image"
                onChange={handleImage}
            />
            <input
                type="file"
                name="image"
                accept="image/*"
                capture="environment"
            />
            {error && <Text color="text.error">{error}</Text>}
            <Button onClick={fileUpload}>Upload</Button>
            <Box position="relative" width={200} height={200}>
                {imageResponse && <Image layout="fill" src={imageResponse} />}
            </Box>
        </form>
    );
}
