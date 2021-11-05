/* eslint-disable no-console */
import React, { ChangeEvent, ReactElement, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
    Input,
    Box,
    Button,
    Text,
    FormControl,
    Select,
} from "@chakra-ui/react";
import Image from "next/image";
import { UAParser } from "ua-parser-js";
import AXIOS from "../../../AXIOS/AXIOS";
import { Theme } from ".prisma/client";

const parser = new UAParser();

type BodyPost = {
    author_id?: string;
    theme_id?: string;
    drawing_name?: string;
};
export default function UploadImageForm(): ReactElement {
    const [image, setImage] = useState<File | undefined>();
    const [postFormData, setPostFormData] = useState<BodyPost | null>();
    const [imageResponse, setImageResponse] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const [themeList, setThemeList] = useState<Theme[]>([]);
    const device = parser.getDevice();

    console.log(themeList);

    const {
        data: ThemesRes,
        isLoading,
        error: queryError,
    } = useQuery("getThemes", () => AXIOS.get("/themes").then((r) => r.data), {
        onSuccess: (data) => {
            setThemeList(data);
        },
    });

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

    const removeImage = () => {
        setImage(undefined);
        setPostFormData({
            author_id: "",
            theme_id: "",
            drawing_name: "",
        });
    };

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPostFormData({
            ...postFormData,
            [e.target.name]: e.target.value,
        });
    };

    const fileUpload = async () => {
        setProgress(0);
        if (image && postFormData) {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("author_id", postFormData.author_id as string);
            formData.append(
                "drawing_name",
                postFormData.drawing_name as string,
            );
            formData.append("theme_id", postFormData.theme_id as string);
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
            alignItems="center"
            flexDirection="column"
            color="white"
            action=""
        >
            <Image
                src="/icons/drawing_upload.png"
                width={100}
                height={100}
                layout="fixed"
            />
            <Input
                boxShadow="inset 0px 1px 8px rgba(0, 0, 0, 0.8)"
                width="100%"
                accept="image/*"
                multiple={false}
                type="file"
                name="image"
                onChange={handleImage}
            />
            {device.type === "mobile" && (
                <Input
                    width="100%"
                    onChange={handleImage}
                    accept="image/*"
                    multiple={false}
                    type="file"
                    name="image"
                    capture="environment"
                />
            )}
            <Input
                color="black"
                boxShadow="inset 0px 1px 8px rgba(0, 0, 0, 0.5)"
                backgroundColor="gray.100"
                width="100%"
                type="text"
                value={postFormData?.author_id}
                name="author_id"
                placeholder="Auteur"
                borderColor="gray.300"
                border="2px"
                onChange={handleChange}
            />
            <Select
                bg="tomato"
                borderColor="tomato"
                color="white"
                placeholder="Theme"
            >
                {themeList.map((theme) => (
                    <option color="black" key={theme.id} value={theme.id}>
                        {theme.name}
                    </option>
                ))}
            </Select>
            {/* <Input
                color="black"
                boxShadow="inset 0px 1px 8px rgba(0, 0, 0, 0.5)"
                backgroundColor="gray.100"
                width="100%"
                placeholder="Theme"
                value={postFormData?.theme_id}
                type="text"
                name="theme_id"
                borderColor="gray.300"
                border="2px"
                onChange={handleChange}
            /> */}
            <Input
                color="black"
                boxShadow="inset 0px 1px 8px rgba(0, 0, 0, 0.5)"
                backgroundColor="gray.100"
                width="100%"
                placeholder="Nom du Dessin ..."
                value={postFormData?.drawing_name}
                type="text"
                name="drawing_name"
                borderColor="gray.300"
                border="2px"
                onChange={handleChange}
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
            <Box display="flex" width="100%" justifyContent="space-around">
                <Button colorScheme="red" type="button" onClick={removeImage}>
                    ANULER
                </Button>
                <Button colorScheme="purple" type="button" onClick={fileUpload}>
                    ENVOYER
                </Button>
            </Box>
            <Box position="relative" width={200} height={200}>
                {imageResponse || image ? (
                    <Image
                        layout="responsive"
                        width={200}
                        height={200}
                        src={URL.createObjectURL(image)}
                    />
                ) : (
                    <></>
                )}
            </Box>
        </FormControl>
    );
}
