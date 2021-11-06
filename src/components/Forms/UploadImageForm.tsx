/* eslint-disable react/no-children-prop */
/* eslint-disable no-console */
import React, { ChangeEvent, ReactElement, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Input, Box, Button, Text } from "@chakra-ui/react";
import { UAParser } from "ua-parser-js";
import ControlledSelect from "../Inputs/ControlledSelect";
import { BodyPicturePost, TTheme } from "../../..";
import axiosInstance from "../../fetcher/axiosInstance";
import ControlledInput from "../Inputs/ControlledInput";
import ImagePreview from "../Image/ImagePreview";
import ProgressBar from "../Assets/ProgressBar";
import ControlledFormWrapper from "./ControlledFormWrapper";

const parser = new UAParser();

export default function UploadImageForm(): ReactElement {
    const [image, setImage] = useState<File | undefined>();
    const [postFormData, setPostFormData] = useState<BodyPicturePost>({
        author_id: "",
        drawing_name: "",
        theme_id: "",
    });
    const [imageResponse, setImageResponse] = useState<string>("");
    const [UXmessage, setUXMessage] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const [themeList, setThemeList] = useState<TTheme[]>([]);

    const device = parser.getDevice();

    useQuery(
        "getThemes",
        () => axiosInstance.get("/themes").then((r) => r.data),
        {
            onSuccess: (data) => {
                setThemeList(data);
            },
        },
    );

    console.log(themeList);
    const { mutateAsync } = useMutation(
        (newImage: FormData) =>
            axiosInstance
                .post("/upload", newImage, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (p) => {
                        setProgress((p.loaded / p.total) * 100);
                    },
                })
                .then((r) => r.data)
                .catch((err) => {
                    setUXMessage(err.response.data.message);
                }),
        {
            onSuccess: (data) => {
                if (data !== undefined) {
                    setImageResponse(data.url);
                }
                setProgress(0);
                if (data.drawing_url !== undefined) {
                    setPostFormData({
                        author_id: "",
                        drawing_name: "",
                        theme_id: "",
                    });
                }
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
        console.log(postFormData);
    };

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        setPostFormData({
            ...postFormData,
            [e.target.name]: e.target.value,
        });
    };

    const fileUpload = async () => {
        console.log(postFormData);
        setProgress(0);
        if (image && postFormData) {
            console.log(postFormData.author_id, postFormData.theme_id);
            const formData = new FormData();
            formData.append("image", image);
            formData.append(
                "author_id",
                "2e39c0b4-ad19-4412-b9a7-d42b226a27e6" as string,
            );
            formData.append("theme_id", postFormData.theme_id as string);
            formData.append(
                "drawing_name",
                postFormData.drawing_name as string,
            );
            await mutateAsync(formData);
        }
    };

    return (
        <ControlledFormWrapper>
            <ImagePreview image={image} imageResponse={imageResponse} />

            {device.type === "mobile" ? (
                <Input
                    width="100%"
                    onChange={handleImage}
                    accept="image/*"
                    multiple={false}
                    type="file"
                    name="image"
                    capture="environment"
                />
            ) : (
                <Input
                    boxShadow="inset 0px 1px 8px rgba(0, 0, 0, 0.8)"
                    width="100%"
                    accept="image/*"
                    multiple={false}
                    type="file"
                    name="image"
                    onChange={handleImage}
                />
            )}
            <ControlledSelect
                themeList={themeList}
                postFormData={postFormData}
                label="Theme"
                handleSelect={handleSelect}
            />
            <ControlledInput
                label="Auteur"
                value={postFormData.author_id}
                handleChange={handleChange}
                name="author_id"
                placeholder="Author"
            />
            <ControlledInput
                label="Dessin"
                handleChange={handleChange}
                name="drawing_name"
                placeholder="Nom du dessin ..."
                value={postFormData.drawing_name}
            />

            <ProgressBar progress={progress} />
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
            {UXmessage ? <Text color="text.error">{UXmessage}</Text> : <></>}
            <Box display="flex" width="100%" justifyContent="space-around">
                <Button colorScheme="red" type="button" onClick={removeImage}>
                    ANULER
                </Button>
                <Button colorScheme="purple" type="button" onClick={fileUpload}>
                    ENVOYER
                </Button>
            </Box>
        </ControlledFormWrapper>
    );
}
